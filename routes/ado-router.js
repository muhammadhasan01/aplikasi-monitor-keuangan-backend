import * as ADO from '../controller/ado-controller.js';
import express from 'express';

const router = express.Router();

router.get('', ADO.getDistinctADOs);

export default router;