// backend/src/routes/order.ts
import express from 'express';
import { Request, Response } from 'express';
import Order, { Status } from '../models/Order';

const router = express.Router();

// Create order
router.post('/', async (req: Request, res: Response) => {
  try {
    console.log('Incoming order data:', req.body); // Log incoming request
    const order = new Order(req.body);
    const savedOrder = await order.save();
    console.log('Order saved successfully:', savedOrder._id);
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ 
      message: 'Error creating order',
      // error: error.message // Only send error message in production
    });
  }
});
// Get all orders
router.get('/', async (req: Request, res: Response) => {
  try {
    const orders = await Order.find().populate('products.productId');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
});

// Update order status (Admin endpoint)
router.put<{ id: string }, { status: Status; adminName?: string }>(
  '/:id/status', 
  async (req: Request<{ id: string }, { status: Status; adminName?: string }>, res: Response) => {
    try {
      const { status, adminName } = req.body;
      const validStatuses: Status[] = ['confirmed', 'advanced', 'delivering', 'delivered', 'failed', 'rejected'];

      const order = await Order.findById(req.params.id);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }

      order.statusHistory.push({
        status,
        timestamp: new Date(),
        updatedBy: adminName || 'admin'
      });
      
      order.currentStatus = status;
      await order.save();
      
      return res.json(order);
    } catch (error) {
      return res.status(500).json({ message: 'Error updating status', error });
    }
  }
);

export default router;
