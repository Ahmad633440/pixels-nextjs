import mongoose, { Document } from 'mongoose';

export type ThumbnailStyle =
  | 'Bold & Graphic'
  | 'Minimalist'
  | 'Photorealistic'
  | 'Illustrated'
  | 'Tech/Futuristic';

export type AspectRatio = '1:1' | '16:9' | '9:16';

export interface IThumbnail extends Document {
  title: string;
  description?: string;
  image_url: string;
  style: ThumbnailStyle;
  aspect_ratio: AspectRatio;
  color_scheme: string;
  prompt_used?: string;
  user_prompt?: string;
  isGenerating?: boolean;
  text_overlay?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ThumbnailSchema = new mongoose.Schema<IThumbnail>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  style: {
    type: String,
    required: true,
    enum: ['Bold & Graphic','Minimalist','Photorealistic','Illustrated','Tech/Futuristic'],
  },
  aspect_ratio: {
    type: String,
    enum: ['1:1','16:9','9:16'],
    default: '16:9',
  },
  color_scheme: {
    type: String,
    enum: ['Default','Dark','Light','Neon','Sunset'],
  },
  text_overlay: {
    type: Boolean,
    default: false,
  },
  image_url: {
    type: String,
  },
  prompt_used: {
    type: String,
  },
  user_prompt: {
    type: String,
  },
  isGenerating: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

// In development, delete the cached model so hot-reload always picks up
// the latest schema (fixes stale enum validation errors after schema changes)
if (process.env.NODE_ENV === 'development' && mongoose.models.Thumbnail) {
  delete (mongoose.models as Record<string, unknown>).Thumbnail;
}

const Thumbnail =
  mongoose.models.Thumbnail ||
  mongoose.model<IThumbnail>('Thumbnail', ThumbnailSchema);

export default Thumbnail;