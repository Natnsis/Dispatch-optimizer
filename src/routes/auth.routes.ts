import express from 'express';
import { LoginAdmin, RegisterAdmin } from '../controllers/auth.controller';
const router = express.Router();

router.post('/admin', RegisterAdmin);
router.post('/admin-login', LoginAdmin);

export default router;
