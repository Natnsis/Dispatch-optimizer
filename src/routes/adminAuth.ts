import { Router } from 'express';
import { adminLogin, adminRefresh } from '../controllers/adminAuthController';

const router = Router();

router.post('/login', adminLogin);
router.post('/refresh', adminRefresh);

export default router;
