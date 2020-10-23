import express from 'express'
const router = express.Router()
import { authUser, getUserProfile } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

router.post('/login', authUser)

// put the 'protect' middleware at the first argument.
router.route('/profile').get(protect, getUserProfile)

export default router
