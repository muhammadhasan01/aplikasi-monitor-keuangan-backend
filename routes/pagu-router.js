import * as Pagu from '../controller/pagu-controller.js';
import express from 'express';

const router = express.Router();

router.get('', Pagu.getAllPagu);
router.get('/:unit/:ado/:year', Pagu.getPagu);
router.get('/s/:unit/:ado/:year', Pagu.getSisaPagu);
router.get('/a/:unit/:ado/:year', Pagu.getAlokasiPagu);
router.get('/p/:unit/:ado/:year', Pagu.getPenggunaanPagu);


export default router;