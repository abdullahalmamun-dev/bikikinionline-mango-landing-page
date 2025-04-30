import mongoose from 'mongoose';

export type Status = 'ordered' | 'confirmed' | 'advanced' | 'delivering' | 'delivered' | 'failed' | 'rejected';

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
    price: number; // Removed quantity
  }>;
  totalAmount: number;
  deliveryCharge: number;
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
    price: { type: Number, required: true } // Removed quantity
  }],
  totalAmount: { type: Number, required: true },
  deliveryCharge: { type: Number, required: true },
  grandTotal: { type: Number, required: true },
  currentStatus: {
    type: String,
    enum: ['ordered', 'confirmed', 'advanced', 'delivering', 'delivered', 'failed', 'rejected'],
    default: 'ordered'
  },
  statusHistory: [{
    status: { 
      type: String, 
      enum: ['ordered', 'confirmed', 'advanced', 'delivering', 'delivered', 'failed', 'rejected'] 
    },
    timestamp: { type: Date, default: Date.now },
    updatedBy: String
  }]
});

orderSchema.pre('save', function(next) {
  if (this.isNew) {
    this.statusHistory = [{
      status: 'ordered',
      timestamp: new Date(),
      updatedBy: 'system'
    }];
  }
  next();
});

export default mongoose.model<IOrder>('Order', orderSchema);
