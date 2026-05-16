'use server'

import connectDB from "@/lib/config/db";
import Thumbnail from "@/models/Thumbnail";
import ai from '@/lib/config/ai';
import { GenerateContentConfig, HarmBlockThreshold, HarmCategory } from '@google/genai';

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

const ColorSchemeDescription = {
    'Default' : 'vibrant and energetic colors, high saturation, bold contrasts, eye-catching palette',
    'Light' : 'neon glow effects, electric blues and pinks, cyberpunk lightening, high contrast glow ',
    'Dark' : 'black and white color scheme, high contrast, dramatic lightening, timeless aesthetic',
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

        const model = 'gemini-3-pro-image-preview';

        const generationConfig: GenerateContentConfig = {
            maxOutputTokens: 32768,
            temperature: 1,
            topP: 0.95,
            responseModalities: ['IMAGE'],
            imageConfig: {
                aspectRatio: aspect_ratio || '16:9'
            },
            safetySettings: [
                {category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.OFF},
                {category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.OFF},
                {category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.OFF},
                {category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.OFF},
                {category: HarmCategory.HARM_CATEGORY_IMAGE_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.OFF},
            ]
        }

        let prompt = `Create a ${stylePrompts[style as keyof typeof stylePrompts]} for: ${title}`; 

        if(color_scheme){
            prompt += ` Use a ${ColorSchemeDescription[color_scheme as keyof typeof ColorSchemeDescription ]} color scheme.`
        }

        if(user_prompt){
            prompt += ` Additional details: ${user_prompt}.`
        }

        prompt += ` The thumbnail should be ${aspect_ratio}, visually stunning, and designed to maximize click-through rate. Make it bold, professional, and impossible to ignore.` 
        
        // GENERATING IMAGE USING AI MODEL
        const response: any = await ai.models.generateContent({
            model, 
            contents: [prompt],
            config: generationConfig
        })

        // Check if the response is valid
        if(!response?.candidates?.[0]?.content?.parts){
            throw new Error('No image generated');
        } 

        const parts = response.candidates[0].content.parts;
        let finalBase64: string | null = null;

        for(const part of parts){
            if(part.inlineData){
                finalBase64 = part.inlineData.data;
            }
        }

        if (!finalBase64) {
             throw new Error('No image data found in response');
        }

        // In a real app, you'd upload this to Cloudinary/S3 and save the URL
        // For now, we'll just update the model with a placeholder or the base64 (if small)
        // But usually we return the base64 or a success message.
        
        // Updating the thumbnail in DB
        thumbnail.image_url = `data:image/png;base64,${finalBase64}`;
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
