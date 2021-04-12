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

export const createRKA = async (req, res) => {
    try {
        const {year, ADO, kegiatan, subkegiatan, rincian_subkegiatan, jenis_belanja, satuan, volume, penggunaan} = req.body;
        const unit = req.params.unit;
        const sub_unit = req.params.subunit; 
        const rincian_belanja = req.params.rincian;
        if (!year || !unit || !sub_unit || !ADO || !kegiatan || !subkegiatan || !rincian_subkegiatan || !rincian_belanja || !jenis_belanja || !satuan || !volume || !penggunaan) {
            print(req.body);
            return res.status(400).send({
                message: "required field cannot be empty"
            });
        }
        const alokasi_ado = await pagu.getAlokasiPagu(unit, ADO, year);
        const penggunaan_ado = await pagu.getPenggunaanPagu(unit, ADO, year);
        const pengeluaran = penggunaan.januari + penggunaan.februari + penggunaan.maret + penggunaan.april + penggunaan.mei + penggunaan.juni + penggunaan.juli + penggunaan.agustus + penggunaan.september + penggunaan.oktober + penggunaan.november + penggunaan.desember;
        if ((pengeluaran + penggunaan_ado) > alokasi_ado) {
            return res.status(400).send({
                message: "insufficient funds"
            });
        }
        
        const newRKA = await RKA.createRKA(unit, sub_unit, rincian_belanja, req.body);
        const newPagu = await pagu.updatePagu(unit, ADO, year, (pengeluaran + penggunaan_ado));
        return res.status(201).send(newRKA);
    } catch (err) {
        return res.status(500).send(err);
    }
};

export const deleteRKA = async (req, res) => {
    try {
        const unit = req.params.unit;
        const sub_unit = req.params.subunit; 
        const rincian_belanja = req.params.rincian;
        const rka = await RKA.getRKA(unit, sub_unit, rincian_belanja);
        const year = rka.year;
        const penggunaan = await RKA.getPengeluaranRKA(unit, sub_unit, rincian_belanja);
        const pengeluaran = penggunaan.januari + penggunaan.februari + penggunaan.maret + penggunaan.april + penggunaan.mei + penggunaan.juni + penggunaan.juli + penggunaan.agustus + penggunaan.september + penggunaan.oktober + penggunaan.november + penggunaan.desember;
        const penggunaan_ado = await pagu.getPenggunaanPagu(unit, ADO, year);

        const deletedRKA = await RKA.deleteRKA(unit, sub_unit, rincian_belanja);
        const newPagu = await pagu.updatePagu(unit, ADO, year, (penggunaan_ado - pengeluaran));
        return res.status(200).send(deletedRKA);
    } catch (err) {
        if (err.name === "accountNotFound")
            return res.status(404).send({
                message: err.message
            });
        return res.status(500).send(err);
    }
}

export default router