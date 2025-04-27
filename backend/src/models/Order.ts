// backend/src/models/Order.ts
import mongoose, { Document, Schema } from 'mongoose';

interface IOrderProduct {
  productId: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
}

export interface IOrder extends Document {
  customerName: string;
  phoneNumber: string;
  address: string;
  deliveryArea: string;
  products: IOrderProduct[];
  totalAmount: number;
  deliveryCharge: number;
  codCharge: number;
  grandTotal: number;
  orderDate: Date;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
}

const OrderSchema = new Schema<IOrder>({
  customerName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  deliveryArea: {
    type: String,
    required: true,
  },
  products: [{
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Mango',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  }],
  totalAmount: {
    type: Number,
    required: true,
  },
  deliveryCharge: {
    type: Number,
    required: true,
  },
  codCharge: {
    type: Number,
    required: true,
  },
  grandTotal: {
    type: Number,
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
  },
}, { timestamps: true });

export default mongoose.model<IOrder>('Order', OrderSchema);
