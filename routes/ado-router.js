import * as ADO from '../controller/ado-controller.js';
import express from 'express';

const router = express.Router();

router.get('', ADO.getDistinctADOs);
router.post('', ADO.createADO);
router.delete('/:id', ADO.deleteADO);

export default router;