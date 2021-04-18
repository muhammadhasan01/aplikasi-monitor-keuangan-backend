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
        var unit = req.params.unit;
        var subunit = req.params.subunit;
        var ado = req.params.ado;
        var year = req.params.year;

        const pagu = await Pagu.getPagu(unit, subunit, ado , year);
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
    const {unit, sub_unit, ADO, year, alokasi, penggunaan} = req.body;
    if (!unit|| sub_unit || !ADO || !year || !alokasi || !penggunaan) {
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
        var unit = req.params.unit;
        var subunit = req.params.subunit;
        var ado = req.params.ado;
        var year = req.params.year;

        const alokasi = await Pagu.getAlokasiPagu(unit, subunit, ado , year);
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
        var unit = req.params.unit;
        var subunit = req.params.subunit;
        var ado = req.params.ado;
        var year = req.params.year;

        const penggunaan = await Pagu.getPenggunaanPagu(unit, subunit, ado , year);
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
        var unit = req.params.unit;
        var subunit = req.params.subunit;
        var ado = req.params.ado;
        var year = req.params.year;

        const sisa = await Pagu.getSisaPagu(unit, subunit, ado , year);
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