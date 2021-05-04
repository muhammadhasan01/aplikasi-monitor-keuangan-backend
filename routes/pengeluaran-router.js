import * as Pengeluaran from '../controller/pengeluaran-controller.js';
import express from 'express';

const router = express.Router();

router.get('', Pengeluaran.getAllPengeluaran);
router.post('', Pengeluaran.inputPengeluaran);
router.get('/:unit', Pengeluaran.getPengeluaranUnit);
router.get('/:id', Pengeluaran.getPengeluaran);
router.put('/:id', Pengeluaran.updatePengeluaran);
router.delete('/:id', Pengeluaran.removePengeluaran);

export default router;