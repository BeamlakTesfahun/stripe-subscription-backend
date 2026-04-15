import express from 'express';
import authRoutes from '../modules/auth/auth.routes.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use('/auth', authRoutes);

export default router;
