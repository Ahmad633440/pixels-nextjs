// TYPES


export type ThumbnailStyle =
  | 'Bold & Graphic'
  | 'Minimalist'
  | 'Photorealistic'
  | 'Illustrated'
  | 'Tech/Futuristic'
   

// DATA


export const colorSchemes = [
  { id: 'Default', name: 'Default', colors: ['#1a1a1a', '#ff1493', '#ffffff'] },
  { id: 'Dark', name: 'Dark', colors: ['#0f0f0f', '#1a1a1a', '#333333'] },
  { id: 'Light', name: 'Light', colors: ['#ffffff', '#f0f0f0', '#e0e0e0'] },
  { id: 'Neon', name: 'Neon', colors: ['#0d0d0d', '#00ffcc', '#ff00ff'] },
  { id: 'Sunset', name: 'Sunset', colors: ['#ff6b35', '#f7c59f', '#ffe0c2'] },
];


export type AspectRatio = '1:1' | '16:9' | '9:16';

export const aspectRatios: AspectRatio[] = [
  '1:1',
  '16:9',
  '9:16',
];

export const thumbnailStyles: ThumbnailStyle[] = [
  'Bold & Graphic',
  'Minimalist',
  'Photorealistic',
  'Illustrated',
  'Tech/Futuristic',
];

export interface IThumbnail {
  id: string;
  // userId: string;
  title: string;
  description?: string;
  // text-overlay?: boolean;
  prompt_used?: string;
  // user-prompt?: string;
  // is-Generating?: boolean;
  image_url: string;
  style: ThumbnailStyle;
  aspect_ratio: AspectRatio;
  color_scheme: string;
  created_at: string;
}
