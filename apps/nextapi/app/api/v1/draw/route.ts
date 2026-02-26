import { NextRequest, NextResponse } from "next/server";
import { authorize } from "../../../api";
import { unzipSync } from "fflate";

const NOVELAI_API_URL = "https://image.novelai.net/ai/generate-image";

const RESOLUTION_MAP: Record<string, { width: number; height: number }> = {
    portrait: { width: 832, height: 1216 },
    landscape: { width: 1216, height: 832 },
    square: { width: 1024, height: 1024 },
};

export async function POST(req: NextRequest) {
    try {
        await authorize();
    } catch (error) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const apiKey = process.env.NOVELAI_API_KEY || "";

        if (!apiKey) {
            return NextResponse.json(
                { error: "NOVELAI_API_KEY is missing in the environment." },
                { status: 500 }
            );
        }

        // Destructure core values with defaults, and allow overriding the rest
        const {
            prompt,
            negativePrompt = "",
            orientation = "square",
            model = "nai-diffusion-4-5-full",
            seed = Math.floor(Math.random() * 4294967295),
            steps = 28,
            scale = 5,
            width: customWidth,
            height: customHeight,
            parameters: customParameters = {}, // User can provide their entire override
            action = "generate",
            ...restBody // Any other top-level payload attributes
        } = body;

        if (!prompt) {
            return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
        }

        // Apply NovelAI's recommended prompt styling
        const enhancedPrompt = `masterpiece, best quality, ${prompt}`;

        let width = customWidth;
        let height = customHeight;

        if (!width || !height) {
            const resolution = RESOLUTION_MAP[orientation] || RESOLUTION_MAP.square;
            width = resolution.width;
            height = resolution.height;
        }

        const defaultNegativePrompt =
            "lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry";

        const baseParameters = {
            params_version: 3,
            width,
            height,
            scale,
            sampler: "k_euler_ancestral",
            steps,
            n_samples: 1,
            ucPreset: 4,
            qualityToggle: false,
            autoSmea: false,
            dynamic_thresholding: false,
            controlnet_strength: 1,
            legacy: false,
            add_original_image: true,
            cfg_rescale: 0,
            noise_schedule: "karras",
            legacy_v3_extend: false,
            skip_cfg_above_sigma: 58,
            use_coords: true,
            normalize_reference_strength_multiple: true,
            inpaintImg2ImgStrength: 1,
            v4_prompt: {
                caption: {
                    base_caption: enhancedPrompt,
                    char_captions: [],
                },
                use_coords: true,
                use_order: true,
            },
            v4_negative_prompt: {
                caption: {
                    base_caption: negativePrompt || defaultNegativePrompt,
                    char_captions: [],
                },
                legacy_uc: false,
            },
            uc: "",
            seed,
            legacy_uc: false,
            characterPrompts: [],
            deliberate_euler_ancestral_bug: false,
            prefer_brownian: true,
        };

        // Deep merge of user-supplied customParameters into baseParameters
        const finalParameters = {
            ...baseParameters,
            ...customParameters,
            // If the user attempts to override sub-objects like v4_prompt, those could be merged defensively
            // but for simplicity we rely on native spread doing a shallow merge at the top level of parameters.
            ...(customParameters.v4_prompt ? {
                v4_prompt: {
                    ...baseParameters.v4_prompt,
                    ...customParameters.v4_prompt
                }
            } : {}),
            ...(customParameters.v4_negative_prompt ? {
                v4_negative_prompt: {
                    ...baseParameters.v4_negative_prompt,
                    ...customParameters.v4_negative_prompt
                }
            } : {})
        };

        const payload = {
            input: enhancedPrompt,
            model,
            action,
            parameters: finalParameters,
            ...restBody, // Extensibility for other core payload keys (like image for img2img)
        };

        const response = await fetch(NOVELAI_API_URL, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
                Accept: "application/x-zip-compressed",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const text = await response.text().catch(() => "");
            console.error("NovelAI request failed:", text, "Payload:", JSON.stringify(payload));
            return NextResponse.json(
                { error: `NovelAI API error: ${response.status} ${response.statusText} ${text}` },
                { status: response.status }
            );
        }

        const arrayBuffer = await response.arrayBuffer();

        // unzip using fflate (returns { [filename]: Uint8Array })
        const files = unzipSync(new Uint8Array(arrayBuffer));

        const firstFile = Object.values(files)[0];
        if (!firstFile) {
            return NextResponse.json(
                { error: "No image found in NovelAI response." },
                { status: 500 }
            );
        }

        return new NextResponse(firstFile as any, {
            status: 200,
            headers: {
                "Content-Type": "image/png",
            },
        });
    } catch (error: any) {
        console.error("Error drawing image:", error);
        return NextResponse.json(
            { error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}
