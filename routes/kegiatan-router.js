import * as Kegiatan from '../controller/kegiatan-controller.js';
import express from 'express';

const router = express.Router();

router.get('', Kegiatan.getKegiatans);
router.get('/subunits', Kegiatan.getSubKegiatans);
router.post('', Kegiatan.createKegiatan);
router.get('/:id', Kegiatan.getKegiatan);
router.put('/:id', Kegiatan.updateKegiatan);
router.delete('/:id', Kegiatan.deleteKegiatan);

export default router;