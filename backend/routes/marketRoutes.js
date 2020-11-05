import express from 'express'
const router = express.Router()
import {
  getMarkets,
  getMyMarkets,
  getMarketById,
  createMarket,
  updateMarket,
  joinMarket,
  leaveMarket,
} from '../controllers/marketController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/my').get(protect, getMyMarkets)
router.route('/').get(getMarkets).post(protect, createMarket)
router.route('/:id').get(getMarketById).put(protect, updateMarket)
router.route('/:id/join').post(protect, joinMarket)
router.route('/:id/leave').post(protect, leaveMarket)

export default router
