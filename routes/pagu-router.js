import * as Pagu from '../controller/pagu-controller.js';
import express from 'express';

const router = express.Router();

router.get('', Pagu.getAllPagu);
router.get('/:unit/:subunit/:ado/:year', Pagu.getPagu);
router.post('/:unit/:subunit/:ado/:year', Pagu.updateAlokasiPagu)
router.get('/sisa/:unit/:subunit/:ado/:year', Pagu.getSisaPagu);
router.get('/alokasi/:unit/:subunit/:ado/:year', Pagu.getAlokasiPagu);
router.get('/penggunaan/:unit/:subunit/:ado/:year', Pagu.getPenggunaanPagu);

router.post('', Pagu.insertNewPagu);

export default router;