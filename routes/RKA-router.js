import express from 'express';
import * as RKA from '../controller/RKA-controller.js';

const router = express.Router();

router.get('', RKA.getAllRKA);
router.get('/s', RKA.getPenggunaan);
router.post('', RKA.createRKA);
router.get('/:unit/:subunit/:rincian', RKA.getRKA);
router.get('/:unit/:subunit/:rincian/s', RKA.getPenggunaanRKA);
router.post('/:unit/:subunit', RKA.createRKA);
router.delete('/:unit/:subunit/:rincian', RKA.deleteRKA);

export default router;