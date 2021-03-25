import express from 'express';
import * as Pagu from '../models/pagu-model.js';

const router = express.Router();

export const getAllPagu = async (req, res) => {
    try {
        console.log("Masuk Controller");
        const allPagu = await Pagu.getAllPagu();
        return res.status(200).send(allPagu);
    } catch (err) {
        return res.status(500).send(err);
    }
};

export const getPagu = async (req, res) => {
    try {
        const pagu = await Pagu.getPagu(req.params.unit, req.params.ado, req.params.year);
        return res.status(200).send(pagu);
    } catch (err) {
        if (err.name === "paguNotFound")
            return res.status(404).send({
                message: err.message
            });
        return res.status(500).send(err);
    }
};

export const insertNewPagu = async (req, res) => {
    const {unit, ADO, year, alokasi, penggunaan} = req.body;
    if (!unit|| !ADO || !year || !alokasi || !penggunaan) {
        return res.status(400).send({
            message: "required field cannot be empty"
        });
    }
    try {
        const pagu = await Pagu.insertNewPagu(req.body);
        return res.status(200).send(pagu);
    } catch (err) {
        if (err.name === "paguNotFound")
            return res.status(404).send({
                message: err.message
            });
        return res.status(500).send(err);
    }
};

export const getAlokasiPagu = async (req, res) => {
    try {
        const alokasi = await Pagu.getAlokasiPagu(req.params.unit, req.params.ado, req.params.year);
        return res.status(200).send({value: alokasi});
    } catch (err) {
        if (err.name === "paguNotFound")
            return res.status(404).send({
                message: err.message
            });
        return res.status(500).send(err);
    }
};

export const getPenggunaanPagu = async (req, res) => {
    try {
        const penggunaan = await Pagu.getPenggunaanPagu(req.params.unit, req.params.ado, req.params.year);
        return res.status(200).send({value: penggunaan});
    } catch (err) {
        if (err.name === "paguNotFound")
            return res.status(404).send({
                message: err.message
            });
        return res.status(500).send(err);
    }
};

export const getSisaPagu = async (req, res) => {
    try {
        const sisa = await Pagu.getSisaPagu(req.params.unit, req.params.ado, req.params.year);
        return res.status(200).send({value: sisa});
    } catch (err) {
        if (err.name === "paguNotFound")
            return res.status(404).send({
                message: err.message
            });
        return res.status(500).send(err);
    }
};


export default router