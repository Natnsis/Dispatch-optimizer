import express from 'express';
import {
  LoginAdmin,
  LogoutAdmin,
  RegisterAdmin,
} from '../controllers/auth.controller';
const router = express.Router();

router.post('/admin', RegisterAdmin);
router.post('/admin-login', LoginAdmin);
router.post('/admin-logout', LogoutAdmin);

export default router;
