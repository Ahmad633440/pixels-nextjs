const apiKey = process.env.HUGGINGFACE_API_KEY || process.env.HF_API_KEY;
const model = process.env.HUGGINGFACE_MODEL || 'FLUX.1-schnell';
const baseUrl = 'https://router.huggingface.co/hf-inference/models';
// const baseUrl = 'https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-schnell';

if (!apiKey) {
    throw new Error("Please define the HUGGINGFACE_API_KEY environment variable inside .env");
}

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function aspectRatioToSize(aspectRatio = '16:9') {
    switch (aspectRatio) {
        case '1:1':
            return { width: 768, height: 768 };
        case '9:16':
            return { width: 768, height: 1365 };
        default:
            return { width: 1280, height: 720 };
    }
}

async function requestHuggingFace(path: string, init: RequestInit, retries = 3) {
    const url = `${baseUrl}/${encodeURIComponent(model)}${path}`;
    let attempt = 0;

    while (true) {
        const response = await fetch(url, init);

        if (response.ok) {
            return response;
        }

        const status = response.status;
        const bodyText = await response.text();
        let errorMessage = `Hugging Face API error ${status}`;

        if (bodyText) {
            try {
                const json = JSON.parse(bodyText);
                if (json.error) {
                    errorMessage = `Hugging Face API error ${status}: ${json.error}`;
                } else {
                    errorMessage = `Hugging Face API error ${status}: ${bodyText}`;
                }
            } catch {
                errorMessage = `Hugging Face API error ${status}: ${bodyText}`;
            }
        }

        if ((status === 429 || status === 502 || status === 503 || status === 504) && attempt < retries) {
            const retryAfterHeader = response.headers.get('retry-after');
            const retryAfter = retryAfterHeader ? parseInt(retryAfterHeader, 10) : NaN;
            const delay = !Number.isNaN(retryAfter) ? retryAfter * 1000 : 1000 * Math.pow(2, attempt + 1);
            await sleep(delay);
            attempt += 1;
            continue;
        }

        throw new Error(errorMessage);
    }
}

export async function generateHuggingFaceImage(prompt: string, aspectRatio = '16:9') {
    const { width, height } = aspectRatioToSize(aspectRatio);
    const payload = {
        inputs: prompt,
        options: { wait_for_model: true },
        parameters: {
            width,
            height,
            guidance_scale: 7.5,
        },
    };

    const response = await requestHuggingFace('', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(payload),
    });

    const contentType = response.headers.get('content-type') || 'image/png';

    if (contentType.startsWith('application/json')) {
        const json = await response.json();
        throw new Error(json.error || 'Unexpected JSON response from Hugging Face image generation');
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    const mimeType = contentType.split(';')[0] || 'image/png';

    return {
        base64: buffer.toString('base64'),
        mimeType,
    };
}

export async function generateHuggingFaceImageFromImage(
    imageDataUrl: string,
    prompt: string,
    aspectRatio = '16:9'
) {
    const { width, height } = aspectRatioToSize(aspectRatio);
    const payload = {
        inputs: {
            prompt,
            image: imageDataUrl,
        },
        options: { wait_for_model: true },
        parameters: {
            width,
            height,
            guidance_scale: 7.5,
        },
    };

    const response = await requestHuggingFace('', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(payload),
    });

    const contentType = response.headers.get('content-type') || 'image/png';

    if (contentType.startsWith('application/json')) {
        const json = await response.json();
        throw new Error(json.error || 'Unexpected JSON response from Hugging Face image-to-image generation');
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    const mimeType = contentType.split(';')[0] || 'image/png';

    return {
        base64: buffer.toString('base64'),
        mimeType,
    };
}
