import express from 'express';
import * as RKA from '../controller/RKA-controller.js';

const router = express.Router();

router.get('', RKA.getAllRKA);
router.get('/s', RKA.getPenggunaan);
router.get('/:unit/:subunit', RKA.getRKAUnit);
router.get(`/:unit/:subunit/ADO/:ADO`, RKA.getRKAUnitADO);
router.get('/:unit/:subunit/:rincian', RKA.getRKA);
router.get('/:unit/:subunit/:rincian/s', RKA.getPenggunaanRKA);

router.post('', RKA.createRKA);
router.post('/:unit/:subunit', RKA.createRKA);
router.post('/tambah/alokasi/:id', RKA.ambilAlokasiRKA);

router.delete('/:unit/:subunit', RKA.deleteRKA);

export default router;