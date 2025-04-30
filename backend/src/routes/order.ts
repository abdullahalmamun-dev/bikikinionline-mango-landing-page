// backend/src/routes/order.ts
import express from 'express'
import { Request, Response } from 'express'
import Order, { Status } from '../models/Order'
import mongoose from 'mongoose'

const router = express.Router()

router.post('/', async (req: Request, res: Response) => {
  try {
    console.log('Incoming order:', JSON.stringify(req.body, null, 2))
    
    // Validate required fields
    const requiredFields = [
      'customerName', 'phoneNumber', 'address', 
      'products', 'totalAmount', 'deliveryCharge', 'grandTotal'
    ]
    
    const missingFields = requiredFields.filter(field => !req.body[field])
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        error: `Missing required fields: ${missingFields.join(', ')}`
      })
    }

    // Validate address structure
    const addressFields = ['house', 'area', 'policeStation', 'district', 'division']
    const missingAddressFields = addressFields.filter(field => !req.body.address[field])
    if (missingAddressFields.length > 0) {
      return res.status(400).json({
        success: false,
        error: `Incomplete address: ${missingAddressFields.join(', ')}`
      })
    }

    // Validate products array
    if (!Array.isArray(req.body.products) || req.body.products.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Invalid products format'
      })
    }

    // Validate numerical fields
    const numericalFields = ['totalAmount', 'deliveryCharge', 'grandTotal']
    const invalidNumbers = numericalFields.filter(field => 
      typeof req.body[field] !== 'number' || isNaN(req.body[field])
    )
    
    if (invalidNumbers.length > 0) {
      return res.status(400).json({
        success: false,
        error: `Invalid numerical values: ${invalidNumbers.join(', ')}`
      })
    }

    // Create order document
    const order = new Order({
      customerName: req.body.customerName.trim(),
      phoneNumber: req.body.phoneNumber.trim(),
      address: {
        house: req.body.address.house.trim(),
        road: req.body.address.road?.trim(),
        area: req.body.address.area.trim(),
        policeStation: req.body.address.policeStation.trim(),
        district: req.body.address.district.trim(),
        division: req.body.address.division.trim()
      },
      deliveryArea: req.body.deliveryArea,
      products: req.body.products.map((p: any) => ({
        productId: new mongoose.Types.ObjectId(p.productId),
        price: p.price
      })),
      totalAmount: req.body.totalAmount,
      deliveryCharge: req.body.deliveryCharge,
      grandTotal: req.body.grandTotal,
      currentStatus: 'ordered' as Status
    })

    const savedOrder = await order.save()
    
    res.status(201).json({
      success: true,
      data: await Order.populate(savedOrder, { path: 'products.productId' })
    })

  } catch (error) {
    console.error('Order creation error:', error)
    
    // Handle validation errors
    if (error instanceof mongoose.Error.ValidationError) {
      const errors = Object.values(error.errors).map(e => ({
        field: e.path,
        message: e.message
      }))
      
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors
      })
    }

    // Handle cast errors
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({
        success: false,
        error: `Invalid format for field: ${error.path}`
      })
    }

    // Generic error response
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      // details: error.message
    })
  }
})

// Rest of the routes remain same...




// Get all orders
router.get('/', async (req: Request, res: Response) => {
  try {
    const orders = await Order.find().populate('products.productId');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching orders',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Update order status (Admin endpoint)
router.put<{ id: string }, any, { status: Exclude<Status, 'ordered'>; adminName?: string }>(
  '/:id/status', 
  async (req, res) => {
    try {
      const { status, adminName } = req.body;
      const validStatuses: Exclude<Status, 'ordered'>[] = 
        ['confirmed', 'advanced', 'delivering', 'delivered', 'failed', 'rejected'];

      if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
      }

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
      return res.status(500).json({ 
        message: 'Error updating status',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
);

export default router;
