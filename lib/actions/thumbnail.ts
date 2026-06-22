'use server'

import connectDB from "@/lib/config/db";
import Thumbnail from "@/models/Thumbnail";
import { generateHuggingFaceImage, generateHuggingFaceImageFromImage } from '@/lib/config/ai';

interface ThumbnailRequestBody {
    title: string;
    prompt: string;
    style: string;
    aspect_ratio: string;
    color_scheme: string;
    text_overlay?: boolean;
}

const stylePrompts = {
    'Bold & Graphic' : 'eye-catching thumbnail, bold typography, vibrant colors, expressive facial reaction, dramatic lightening, high contrast, click-worthy composition, professional style',
    'Tech/Futuristic' : 'futuristic thumbnail, sleek modern design, digital UI elements, glowing accents, holographic effects, cyber-tech aesthetics, sharp lightening, high-tech atmosphere',
    'Minimalist' : 'minimalist thumbnail, clean layout, simple shapes, limited color pallete, plenty of negative space, modern flat design, clear focal point',
    'Photorealistic' : 'photorealistic thumbnail, ultra-realistic lighting, natural skin tones, candid moment, DSLR-style photography, lifestyle realism, shallow depth of field',
    'Illustrated' : 'illustrated thumbnail, custom digital illustration, stylized characters, bold outlines, vibrant colors, creative cartoon or vector art style',
}

const ColorSchemeDescription: Record<string, string> = {
    'Default' : 'vibrant and energetic colors, high saturation, bold contrasts, eye-catching palette',
    'Dark'    : 'black and white color scheme, high contrast, dramatic lighting, timeless aesthetic',
    'Light'   : 'soft pastel tones, bright and airy, clean whites and warm neutrals, inviting and fresh',
    'Neon'    : 'electric neon glow effects, cyberpunk neon blues and magentas, dark background with vivid neon accents, high contrast glow',
    'Sunset'  : 'warm sunset gradient palette, rich oranges, coral pinks and golden yellows, warm and energetic atmosphere',
}

export async function generateThumbnailAction(data: ThumbnailRequestBody) {
    try {
        await connectDB();

        const {
            title,
            prompt: user_prompt,
            style,
            aspect_ratio,
            color_scheme,
            text_overlay
        } = data;

        const thumbnail = await Thumbnail.create({
            title,
            user_prompt,
            style,
            aspect_ratio,
            color_scheme,
            text_overlay,
            isGenerating: true
        });

        let prompt = `Create a ${stylePrompts[style as keyof typeof stylePrompts]} for: ${title}`;

        if (color_scheme) {
            prompt += ` Use a ${ColorSchemeDescription[color_scheme as keyof typeof ColorSchemeDescription]} color scheme.`;
        }

        if (user_prompt) {
            prompt += ` Additional details: ${user_prompt}.`;
        }

        prompt += ` The thumbnail should be ${aspect_ratio}, visually stunning, and designed to maximize click-through rate. Make it bold, professional, and impossible to ignore.`;

        const generatedImage = await generateHuggingFaceImage(prompt, aspect_ratio);

        if (!generatedImage?.base64) {
            throw new Error('No image data returned from Hugging Face');
        }

        const finalBase64 = generatedImage.base64;
        const mimeType = generatedImage.mimeType || 'image/png';

        // Updating the thumbnail in DB
        thumbnail.image_url = `data:${mimeType};base64,${finalBase64}`;
        thumbnail.prompt_used = prompt;
        thumbnail.isGenerating = false;
        await thumbnail.save();


        return {
            success: true,
            data: JSON.parse(JSON.stringify(thumbnail))
        };

    } catch (error: any) {
        console.error('Error generating thumbnail:', error);
        return {
            success: false,
            message: error.message || 'Failed to generate thumbnail'
        };
    }
}

async function getImageDataUrl(imageInput: string) {
    if (imageInput.startsWith('data:')) {
        return imageInput;
    }

    try {
        const response = await fetch(imageInput);
        if (!response.ok) {
            throw new Error(`Failed to fetch image from URL: ${response.statusText}`);
        }
        const buffer = await response.arrayBuffer();
        const contentType = response.headers.get('content-type') || 'image/png';
        const base64Data = Buffer.from(buffer).toString('base64');
        return `data:${contentType};base64,${base64Data}`;
    } catch (e: any) {
        throw new Error(`Error fetching image from URL: ${e.message}`);
    }
}

export async function recreateThumbnailAction(data: {
    imageInput: string;
    prompt: string;
    aspect_ratio: string;
}) {
    try {
        await connectDB();

        const { imageInput, prompt: user_prompt, aspect_ratio } = data;

        if (!imageInput) {
            throw new Error("Image input (upload or URL) is required");
        }

        // Create initial thumbnail document in DB
        const thumbnail = await Thumbnail.create({
            title: "Recreated Thumbnail",
            user_prompt,
            style: "Bold & Graphic",
            aspect_ratio,
            color_scheme: "Default",
            isGenerating: true
        });

        const imageDataUrl = await getImageDataUrl(imageInput);

        const systemPrompt = `You are an AI thumbnail copy maker. Below is an input image. Please recreate it as a new high-quality, professional, and visually stunning thumbnail with the following requested changes:
"${user_prompt || 'Enhance the original thumbnail to be more click-worthy and professional.'}"
Make the recreated thumbnail in ${aspect_ratio} aspect ratio, clear, engaging, and impossible to ignore.`;

        const generatedImage = await generateHuggingFaceImageFromImage(imageDataUrl, systemPrompt, aspect_ratio);

        if (!generatedImage?.base64) {
            throw new Error('No image data returned from Hugging Face');
        }

        const finalBase64 = generatedImage.base64;
        const mimeType = generatedImage.mimeType || 'image/png';

        // Updating the thumbnail in DB
        thumbnail.image_url = `data:${mimeType};base64,${finalBase64}`;
        thumbnail.prompt_used = systemPrompt;
        thumbnail.isGenerating = false;
        await thumbnail.save();


        return {
            success: true,
            data: JSON.parse(JSON.stringify(thumbnail))
        };

    } catch (error: any) {
        console.error('Error recreating thumbnail:', error);
        return {
            success: false,
            message: error.message || 'Failed to recreate thumbnail'
        };
    }
}

export async function getThumbnailsAction() {
    try {
        await connectDB();
        const thumbnails = await Thumbnail.find({}).sort({ createdAt: -1 });
        return {
            success: true,
            data: JSON.parse(JSON.stringify(thumbnails))
        };
    } catch (error: any) {
        console.error('Error getting thumbnails:', error);
        return {
            success: false,
            message: error.message || 'Failed to get thumbnails'
        };
    }
}

export async function deleteThumbnailAction(id: string) {
    try {
        await connectDB();
        await Thumbnail.findByIdAndDelete(id);
        return {
            success: true
        };
    } catch (error: any) {
        console.error('Error deleting thumbnail:', error);
        return {
            success: false,
            message: error.message || 'Failed to delete thumbnail'
        };
    }
}
