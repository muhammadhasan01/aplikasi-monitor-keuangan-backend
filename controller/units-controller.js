import express from 'express';
import * as Units from '../models/units-model.js';

const router = express.Router();

export const getUnits = async (req, res) => {
    try {
        const units = await Units.getUnits();
        return res.status(200).send(units);
    } catch (err) {
        return res.status(500).send(err);
    }
};

export const getDistinctUnits = async (req, res) => {
    try {
        const units = await Units.getDistinctUnits();
        return res.status(200).send(units);
    } catch (err) {
        return res.status(500).send(err);
    }
};

export const getSubUnits = async (req, res) => {
    try {
        const subunits = await Units.getSubUnits();
        return res.status(200).send(subunits);
    } catch (err) {
        return res.status(500).send(err);
    }
};

export const getUnit = async (req, res) => {
    try {
        const unit = await Units.getUnit(req.params.unit);
        return res.status(200).send(unit);
    } catch (err) {
        if (err.name === "unitNotFound")
            return res.status(404).send({
                message: err.message
            });
        return res.status(500).send(err);
    }
};

export const getSubUnitsForUnits = async (req, res) => {
    try {
        const subunits = await Units.getSubUnitsForUnits(req.params.unit);
        return res.status(200).send(subunits);
    } catch (err) {
        if (err.name === "unitNotFound")
            return res.status(404).send({
                message: err.message
            });
        return res.status(500).send(err);
    }
};


export const createUnit = async (req, res) => {
    try {
        const {unit, code, subunit} = req.body;

        console.log(unit);
        console.log(code);
        console.log(subunit);

        if (!unit || !code || !subunit) {
            return res.status(400).send({
                message: "required field cannot be empty"
            })
        }

        const UnitExist = await Units.isUnitExist(unit, code, subunit)

        if(UnitExist)
        {
            console.log("Ada unitnya");
            return res.status(400).send({
                message: "there are duplicate units"
            });
        }
            
        
        const newUser = await Units.createUnit(req.body);
        return res.status(201).send(newUser);
    } catch (err) {
        return res.status(500).send(err);
    }
};

export const updateUnit = async (req, res) => {
    try {
        const {name, code, subunit} = req.body;
        if (!name || !code || !subunit) {
            res.status(400).send({
                message: "required field cannot be empty"
            })
        }
        const newUser = await Units.updateUnit(req.params.id, req.body);
        return res.status(200).send(newUser);
    } catch (err) {
        if (err.name === "unitNotFound")
            return res.status(404).send({
                message: err.message
            });
        return res.status(500).send(err);
    }
}

export const deleteUnit = async (req, res) => {
    try {
        const deletedUnit = await Units.deleteUnit(req.params.id);
        return res.status(200).send(deletedUnit);
    } catch (err) {
        if (err.name === "unitNotFound")
            return res.status(404).send({
                message: err.message
            });
        return res.status(500).send(err);
    }
}

export default router