import { unzipSync } from 'fflate'

export interface DrawParams {
    prompt?: string
    orientation?: 'portrait' | 'landscape' | 'square'
}

const RESOLUTION_MAP: Record<string, { width: number; height: number }> = {
    portrait: { width: 832, height: 1216 },
    landscape: { width: 1216, height: 832 },
    square: { width: 1024, height: 1024 }
}

export default function easynovelai(apiKey: string, baseUrl: string = 'https://image.novelai.net') {
    const apiUrl = baseUrl.endsWith('ai/generate-image') ? baseUrl : (baseUrl.endsWith('/') ? `${baseUrl}ai/generate-image` : `${baseUrl}/ai/generate-image`);
    async function generateImage({ prompt, orientation = 'square' }: DrawParams) {
        if (!prompt) {
            throw new Error('`prompt` is required')
        }

        const enhancedPrompt = `masterpiece, best quality, ${prompt}`

        const { width = 1024, height = 1024 } = RESOLUTION_MAP[orientation]

        const payload = {
            input: enhancedPrompt,
            model: 'nai-diffusion-4-5-full',
            action: 'generate',
            parameters: {
                params_version: 3,
                width,
                height,
                scale: 5,
                sampler: 'k_euler_ancestral',
                steps: 28,
                n_samples: 1,
                ucPreset: 4,
                qualityToggle: false,
                autoSmea: false,
                dynamic_thresholding: false,
                controlnet_strength: 1,
                legacy: false,
                add_original_image: true,
                cfg_rescale: 0,
                noise_schedule: 'karras',
                legacy_v3_extend: false,
                skip_cfg_above_sigma: 58,
                use_coords: true,
                normalize_reference_strength_multiple: true,
                inpaintImg2ImgStrength: 1,
                v4_prompt: {
                    caption: {
                        base_caption: enhancedPrompt,
                        char_captions: []
                    },
                    use_coords: true,
                    use_order: true
                },
                v4_negative_prompt: {
                    caption: {
                        base_caption:
                            'lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry',
                        char_captions: []
                    },
                    legacy_uc: false
                },
                uc: '',
                seed: Math.floor(Math.random() * 4294967295),
                legacy_uc: false,
                characterPrompts: [],
                deliberate_euler_ancestral_bug: false,
                prefer_brownian: true
            }
        }

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                Accept: 'application/x-zip-compressed'
            },
            body: JSON.stringify(payload)
        })

        if (!response.ok) {
            const text = await response.text().catch(() => '')
            throw new Error(`NovelAI API error: ${response.status} ${response.statusText} ${text}`)
        }

        const arrayBuffer = await response.arrayBuffer()

        // unzip using fflate (returns { [filename]: Uint8Array })
        const files = unzipSync(new Uint8Array(arrayBuffer))

        const firstFile = Object.values(files)[0]
        if (!firstFile) {
            throw new Error('No image found in response')
        }

        return firstFile

    }

    return {
        generateImage,
    }
}