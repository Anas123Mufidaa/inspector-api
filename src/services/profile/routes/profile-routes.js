import { Router } from 'express';
import authMiddleware from '../../../middlewares/auth.js';
import { validateUpdateProfile } from '../validator/profile-validator.js';
import { getProfile, updateProfile } from '../controller/profile-controller.js';

const router = Router();

router.use(authMiddleware);

router.get('/',  getProfile);
router.put('/',  validateUpdateProfile, updateProfile);

export default router;