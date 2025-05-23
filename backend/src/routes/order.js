import express from 'express';
import Order from '../models/Order.js';
import mongoose from 'mongoose';

const router = express.Router();

router.post('/', async (req, res) => {
  try {

    const { customerName, phoneNumber, address, products, deliveryArea } = req.body;

    // Validation
    const requiredFields = ['customerName', 'phoneNumber', 'address', 'products', 'deliveryArea'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        error: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Please select at least one product'
      });
    }

    // Process products
    const processedProducts = products.map(p => ({
      name: p.name,
      weight: p.weight,
      price: Number(p.price),
      quantity: Number(p.quantity) || 1,
      total: Number(p.price) * (Number(p.quantity) || 1)
    }));

    // Calculate totals
    const subtotal = processedProducts.reduce((sum, p) => sum + p.total, 0);
    const deliveryCharge = deliveryArea === 'dhaka' ? 100 : 150;
    const grandTotal = subtotal + deliveryCharge;

    // Create order
    const order = new Order({
      customerName: customerName.trim(),
      phoneNumber: phoneNumber.trim(),
      address: address.trim(),
      deliveryArea,
      products: processedProducts,
      subtotal,
      deliveryCharge,
      grandTotal,
      currentStatus: 'ordered'
    });

    const savedOrder = await order.save();

    res.status(201).json({
      success: true,
      data: savedOrder
    });

  } catch (error) {
    console.error('Order creation error:', error);
    
    if (error instanceof mongoose.Error.ValidationError) {
      const errors = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors
      });
    }

    res.status(500).json({
      success: false,
      error: error.message || 'Internal server error'
    });
  }
});


router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json({
      success: true,
      data: orders
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message || 'Unknown error'
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Validate order exists
    const existingOrder = await Order.findById(id);
    if (!existingOrder) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }

    // Process products if updated
    if (updateData.products) {
      updateData.products = updateData.products.map(p => ({
        name: p.name,
        weight: p.weight,
        price: Number(p.price),
        quantity: Number(p.quantity) || 1,
        total: Number(p.price) * (Number(p.quantity) || 1)
      }));
    }

    // Recalculate totals if products or delivery area changes
    if (updateData.products || updateData.deliveryArea) {
      const products = updateData.products || existingOrder.products;
      const deliveryArea = updateData.deliveryArea || existingOrder.deliveryArea;
      
      updateData.subtotal = products.reduce((sum, p) => sum + p.total, 0);
      updateData.deliveryCharge = deliveryArea === 'dhaka' ? 100 : 150;
      updateData.grandTotal = updateData.subtotal + updateData.deliveryCharge;
    }

    // Update order with validation
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { $set: updateData },
      {
        new: true,
        runValidators: true,
        overwrite: false,
        context: 'query'
      }
    );

    res.json({
      success: true,
      data: updatedOrder
    });

  } catch (error) {
    console.error('Order update error:', error);
    
    if (error instanceof mongoose.Error.ValidationError) {
      const errors = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors
      });
    }

    res.status(500).json({
      success: false,
      error: error.message || 'Internal server error'
    });
  }
});

export default router;
