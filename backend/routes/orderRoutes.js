import express from 'express'
const router = express.Router()
import {
  addOrderItems,
  getOrderById,
  updateOrder,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getMySelling,
  getOrders,
} from '../controllers/orderController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/myselling').get(protect, getMySelling)

router.route('/:id').get(protect, getOrderById).put(protect, updateOrder)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)

export default router
