import { Router } from 'express';
import authenticationRoutes from '../services/authentications/routes/authentication-routes.js';
import auditRoutes          from '../services/audits/routes/audit-routes.js';
import profileRoutes        from '../services/profile/routes/profile-routes.js';

const router = Router();

router.use('/auth',    authenticationRoutes);
router.use('/audits',  auditRoutes);
router.use('/profile', profileRoutes);

export default router;