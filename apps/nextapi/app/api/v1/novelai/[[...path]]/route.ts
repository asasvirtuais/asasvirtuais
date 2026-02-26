import { NextRequest, NextResponse } from "next/server";

const API_BASE = "https://api.novelai.net";
const IMAGE_BASE = "https://image.novelai.net";

export async function GET(req: NextRequest, { params }: { params: Promise<{ path?: string[] }> }) {
    const { path } = await params;
    return proxyRequest(req, path);
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ path?: string[] }> }) {
    const { path } = await params;
    return proxyRequest(req, path);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ path?: string[] }> }) {
    const { path } = await params;
    return proxyRequest(req, path);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ path?: string[] }> }) {
    const { path } = await params;
    return proxyRequest(req, path);
}

export async function OPTIONS() {
    return new NextResponse(null, {
        status: 204,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Max-Age": "86400",
        },
    });
}

async function proxyRequest(req: NextRequest, pathArray?: string[]) {
    try {
        const path = pathArray?.join("/") || "";

        // NovelAI uses different subdomains for core API and image generation
        // Based on the novelai package, we decide which one to use.
        const isImageRequest = path.startsWith("ai/generate-image") || path.startsWith("ai/upscale");
        const baseUrl = isImageRequest ? IMAGE_BASE : API_BASE;

        const targetUrl = new URL(path, baseUrl);
        targetUrl.search = req.nextUrl.search;

        // Clone headers and prepare them for forwarding
        const forwardHeaders = new Headers();

        // Forward essential headers
        const allowedHeaders = [
            "authorization",
            "content-type",
            "accept",
        ];

        req.headers.forEach((value, key) => {
            if (allowedHeaders.includes(key.toLowerCase())) {
                forwardHeaders.set(key, value);
            }
        });

        const fetchOptions: RequestInit = {
            method: req.method,
            headers: forwardHeaders,
            // Skip the next.js cache for proxy requests to ensure we get fresh results
            cache: 'no-store',
        };

        // Forward body for non-GET/HEAD requests
        if (req.method !== "GET" && req.method !== "HEAD") {
            fetchOptions.body = await req.arrayBuffer();
        }

        const response = await fetch(targetUrl.toString(), fetchOptions);

        // Prepare response headers
        const responseHeaders = new Headers();
        response.headers.forEach((value, key) => {
            // Forward relevant response headers, but filter out ones that might cause issues
            const forbiddenResponseHeaders = [
                "content-encoding",
                "transfer-encoding",
                "access-control-allow-origin",
                "access-control-allow-methods",
                "access-control-allow-headers"
            ];
            if (!forbiddenResponseHeaders.includes(key.toLowerCase())) {
                responseHeaders.set(key, value);
            }
        });

        // Inject CORS headers to override NovelAI's and allow browser access via this proxy
        responseHeaders.set("Access-Control-Allow-Origin", "*");

        const responseData = await response.arrayBuffer();

        return new NextResponse(responseData, {
            status: response.status,
            headers: responseHeaders,
        });
    } catch (error: any) {
        console.error("NovelAI Proxy Error:", error);
        return NextResponse.json(
            { error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}
