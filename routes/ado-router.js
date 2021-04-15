import * as ADO from '../controller/ado-contoller.js';
import express from 'express';

const router = express.Router();

router.get('', ADO.getDistinctADOs);

export default router;