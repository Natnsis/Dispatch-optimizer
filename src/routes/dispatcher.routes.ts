import express from 'express';
const router = express.Router();
import multer from 'multer';
import {
  addDispatcher,
  deleteDispatcher,
  getAllDispatchers,
  getDispatcher,
  updataDispatcher,
} from '../controllers/dispatcher.controller';

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', upload.single('image'), addDispatcher);
router.delete('/:id', deleteDispatcher);
router.put('/:id', updataDispatcher);
router.get('/', getAllDispatchers);
router.get('/:id', getDispatcher);

export default router;
