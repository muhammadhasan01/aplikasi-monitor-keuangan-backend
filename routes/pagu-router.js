import * as Pagu from '../controller/pagu-controller.js';
import express from 'express';

const router = express.Router();

router.get('', Pagu.getAllPagu);
router.get('/:unit/:subunit/:ado/:year', Pagu.getPagu);
router.get('/s/:unit/:subunit/:ado/:year', Pagu.getSisaPagu);
router.get('/a/:unit/:subunit/:ado/:year', Pagu.getAlokasiPagu);
router.get('/p/:unit/:subunit/:ado/:year', Pagu.getPenggunaanPagu);

router.post('', Pagu.insertNewPagu);


export default router;