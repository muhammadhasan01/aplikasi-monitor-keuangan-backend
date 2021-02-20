import Units from '../models/units.js';
import express from 'express';

const router = express.Router();

export const getUnits = async (req, res) => {
    try {
        const units = await Units.find()
        res.status(200).json(units);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createUnit = async (req, res) => {
    const { nama } = req.body;
    const newUnit = new Units({ nama });
    try {
        await newUnit.save();
        res.status(201).json(newUnit);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
};

export default router