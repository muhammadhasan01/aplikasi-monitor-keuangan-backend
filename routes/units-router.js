import * as Units from '../controller/units-controller.js';
import express from 'express';

const router = express.Router();

router.get('', Units.getUnits);
router.get('/subunits', Units.getSubUnits);
router.get('/d', Units.getDistinctUnits);
router.get('/d/:unit', Units.getSubUnitsForUnits);
router.post('', Units.createUnit);
router.get('/:id', Units.getUnit);
router.put('/:id', Units.updateUnit);
router.delete('/:id', Units.deleteUnit);

export default router;