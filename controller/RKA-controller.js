import express from 'express';
import * as RKA from '../models/RKA-model.js';

const router = express.Router();

export const getAllRKA = async (req, res) => {
    try {
        console.log("Masuk Controller");
        const allRKA = await RKA.getAllRKA();
        return res.status(200).send(allRKA);
    } catch (err) {
        return res.status(500).send(err);
    }
};

export const getPengeluaran = async (req, res) => {
    try {
        console.log("Masuk Controller");
        const pengeluaran = await RKA.getPengeluaran();
        return res.status(200).send(pengeluaran);
    } catch (err) {
        return res.status(500).send(err);
    }
};

export const getRKA = async (req, res) => {
    try {
        const rka = await RKA.getRKA(req.params.unit, req.params.subunit, req.params.rincian);
        return res.status(200).send(rka);
    } catch (err) {
        if (err.name === "paguNotFound")
            return res.status(404).send({
                message: err.message
            });
        return res.status(500).send(err);
    }
};

export const getPengeluaranRKA = async (req, res) => {
    try {
        const rka = await RKA.getPengeluaranRKA(req.params.unit, req.params.subunit, req.params.rincian);
        return res.status(200).send(rka);
    } catch (err) {
        if (err.name === "paguNotFound")
            return res.status(404).send({
                message: err.message
            });
        return res.status(500).send(err);
    }
};

export default router