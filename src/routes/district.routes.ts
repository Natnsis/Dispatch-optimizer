import express from 'express';
import {
  addDistrict,
  deleteDistrict,
} from '../controllers/district.controller';
const router = express.Router();

router.post('/', addDistrict);
router.delete('/', deleteDistrict);
