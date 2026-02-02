import express from 'express';
import Order from '../models/Order.js';
import protect from '../middleware/authMiddleware.js';
import { addOrder, getMyOrders } from '../controllers/orderController.js';

const router = express.Router();

// POST /api/orders
router.post('/', protect, addOrder);

// apt GET /api/orders/myorders
router.get('/myorders', protect, getMyOrders);

export default router;
