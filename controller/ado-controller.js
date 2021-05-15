import express from 'express';
import * as Units from '../models/units-model.js';
import * as Pagu from '../models/pagu-model.js';
import * as ADO from '../models/ado-model.js';

const router = express.Router();

function currentYear() {
  return new Date().getFullYear();
}

export const getDistinctADOs = async (req, res) => {
  try {
    const ado = await ADO.getDistinctADOs();
    return res.status(200).send(ado);
  } catch (err) {
    return res.status(500).send(err);
  }
};

export const createADO = async (req, res) => {
  try {
    const {name, detail} = req.body;
    if (!name || !detail) {
      return res.status(400).send({
        message: "required field cannot be empty"
      });
    }
    const newADO = await ADO.createADO(req.body);

    const units = await Units.getUnits();
    for (let index = 0; index < units.length; index++) {
      const unit = units[index];
      let data = {
        unit: unit.unit,
        subunit: unit.subunit,
        ADO: newADO.name,
        year: currentYear(),
        alokasi: 0,
        penggunaan: 0
      }
      try {
        const pagu = await Pagu.insertNewPagu(data);
      } catch (err) {
        if (err.name === "paguNotFound")
          return res.status(404).send({
            message: err.message
          });
        return res.status(500).send(err);
      }
    }

    return res.status(201).send(newADO);
  } catch (err) {
    return res.status(500).send(err);
  }
};

export default router