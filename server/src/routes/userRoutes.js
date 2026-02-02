import express from 'express';
import {
  authUser,
  registerUser,
  getMyProfile,
  updateMyProfile,
  changePassword,
} from '../controllers/userController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', authUser);
router.post('/register', registerUser);

// 🔐 cần đăng nhập
router.get('/profile', protect, getMyProfile);
router.put('/profile', protect, updateMyProfile);   
router.put('/change-password', protect, changePassword);

export default router;
