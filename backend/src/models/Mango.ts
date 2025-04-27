// backend/src/models/Mango.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IMango extends Document {
  name: string;
  variety: string;
  description: string;
  price: number;
  weight: string;
  image: string;
  inStock: boolean;
  features: string[];
}

const MangoSchema = new Schema<IMango>({
  name: {
    type: String,
    required: true,
  },
  variety: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  weight: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  features: {
    type: [String],
    default: [],
  },
}, { timestamps: true });

export default mongoose.model<IMango>('Mango', MangoSchema);
