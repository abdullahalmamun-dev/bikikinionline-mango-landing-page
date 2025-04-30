// backend/src/models/Order.ts
import mongoose from 'mongoose';

export type Status = 'confirmed' | 'advanced' | 'delivering' | 'delivered' | 'failed' | 'rejected';

// type Status = 'confirmed' | 'advanced' | 'delivering' | 'delivered' | 'failed' | 'rejected';

interface IStatusHistory {
  status: Status;
  timestamp: Date;
  updatedBy: string;
}

interface IOrder {
  customerName: string;
  phoneNumber: string;
  address: {
    house: string;
    road?: string;
    area: string;
    policeStation: string;
    district: string;
    division: string;
  };
  deliveryArea: string;
  products: Array<{
    productId: mongoose.Types.ObjectId;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  deliveryCharge: number;
  codCharge: number;
  grandTotal: number;
  currentStatus: Status;
  statusHistory: IStatusHistory[];
}

const orderSchema = new mongoose.Schema<IOrder>({
  customerName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: {
    house: { type: String, required: true },
    road: String,
    area: { type: String, required: true },
    policeStation: { type: String, required: true },
    district: { type: String, required: true },
    division: { type: String, required: true }
  },
  deliveryArea: { type: String, required: true },
  products: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Mango', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  }],
  totalAmount: { type: Number, required: true },
  deliveryCharge: { type: Number, required: true },
  codCharge: { type: Number, required: true },
  grandTotal: { type: Number, required: true },
  currentStatus: {
    type: String,
    enum: ['confirmed', 'advanced', 'delivering', 'delivered', 'failed', 'rejected'],
    default: 'confirmed'
  },
  statusHistory: [{
    status: { type: String, enum: ['confirmed', 'advanced', 'delivering', 'delivered', 'failed', 'rejected'] },
    timestamp: { type: Date, default: Date.now },
    updatedBy: String
  }]
});

export default mongoose.model<IOrder>('Order', orderSchema);
