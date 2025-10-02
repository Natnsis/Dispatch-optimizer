import express from 'express';
import { RegisterAdmin } from '../controllers/auth.controller';
const router = express.Router();

router.post('/admin', RegisterAdmin);

export default router;
