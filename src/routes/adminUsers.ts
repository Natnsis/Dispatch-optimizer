import { Router } from 'express';
import { authenticate, adminOnly } from '../middleware/auth';
import { listUsers, getUser, createUser, updateUser, deleteUser } from '../controllers/adminUsersController';

const router = Router();

router.use(authenticate, adminOnly);

router.get('/', listUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
