import express from 'express';
import * as RKA from '../controller/RKA-controller.js';

const router = express.Router();

router.get('', RKA.getAllRKA);
router.get('/s', RKA.getPenggunaan);
router.post('', RKA.createRKA);
router.get('/:unit/:subunit/:rincian', RKA.getRKA);
router.get('/:unit/:subunit/:rincian/s', RKA.getPenggunaanRKA);

export default router;