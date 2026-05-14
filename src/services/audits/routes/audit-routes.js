import { Router } from 'express';
import authMiddleware from '../../../middlewares/auth.js';
import { validateCreateAudit } from '../validator/audit-validator.js';
import {
  createAudit,
  getAllAudits,
  getAuditById,
} from '../controller/audit-controller.js';

const router = Router();

router.use(authMiddleware); // semua audit routes wajib login

router.post('/',    validateCreateAudit, createAudit);
router.get('/',     getAllAudits);
router.get('/:id',  getAuditById);

export default router;