import { getUnits, createUnit } from '../controller/units.js';
import express from 'express';

const router = express.Router();

router.get('/', getUnits);
router.post('/', createUnit);

export default router;