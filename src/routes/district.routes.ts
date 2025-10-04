import express from 'express';
import {
  addDistrict,
  deleteDistrict,
  getDistrict,
} from '../controllers/district.controller';
const router = express.Router();

router.get('/', getDistrict);
router.post('/', addDistrict);
router.delete('/:id', deleteDistrict);

export default router;
