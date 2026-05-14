import { Router } from 'express';
import passport from '../../../security/passport.js';
import {
  googleCallback,
  refreshToken,
  logout,
} from '../controller/authentication-controller.js';
import { validateRefreshToken } from '../validator/authentication-validator.js';
import authMiddleware from '../../../middlewares/auth.js';
import { getMe } from '../controller/authentication-controller.js';


const router = Router();

// Redirect ke Google consent screen
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'], session: false })
);

// Google callback setelah user consent
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  googleCallback
);

// Refresh access token
router.put('/refresh', validateRefreshToken, refreshToken);

router.get('/me', authMiddleware, getMe);

router.delete('/logout', validateRefreshToken, logout);

export default router;