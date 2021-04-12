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

export const getPenggunaan = async (req, res) => {
    try {
        console.log("Masuk Controller");
        const pengeluaran = await RKA.getPenggunaan();
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

export const getPenggunaanRKA = async (req, res) => {
    try {
        const rka = await RKA.getPenggunaanRKA(req.params.unit, req.params.subunit, req.params.rincian);
        return res.status(200).send(rka);
    } catch (err) {
        if (err.name === "paguNotFound")
            return res.status(404).send({
                message: err.message
            });
        return res.status(500).send(err);
    }
};

export const createRKA = async (req,res) => {
    console.log("Bentar dulu")
}

export default router