import express from 'express';
import {
  LoginAdmin,
  LoginDispatcher,
  Logout,
  RegisterAdmin,
} from '../controllers/auth.controller';
const router = express.Router();

router.post('/admin', RegisterAdmin);
router.post('/admin-login', LoginAdmin);
router.post('/logout', Logout);
router.post('/dispatcher-login', LoginDispatcher);

export default router;
