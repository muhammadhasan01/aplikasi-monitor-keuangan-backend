import express from 'express';
import * as RKA from '../models/RKA-model.js';
import * as pagu from '../models/pagu-model.js';

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

export const getRKAUnit = async (req, res) => {
    try {
        unit = req.params.unit;
        subunit = req.params.subunit;
        const rka = await RKA.getRKAUnit(req.params.unit, req.params.subunit);
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
        const penggunaanAwal = {
            "januari": 0,
            "februari": 0,
            "maret": 0,
            "april": 0,
            "mei": 0,
            "juni": 0,
            "juli": 0,
            "agustus": 0,
            "september": 0,
            "oktober": 0,
            "november": 0,
            "desember": 0
        };

        const {year, ADO, kegiatan, subkegiatan, rincian_subkegiatan, rincian_belanja, jenis_belanja, satuan, volume, rancangan} = req.body;
        const unit = req.params.unit;
        const sub_unit = req.params.subunit; 

        
        if (!year || !unit || !sub_unit || !ADO || !kegiatan || !subkegiatan || !rincian_subkegiatan || !rincian_belanja || !jenis_belanja || !satuan || !volume || !rancangan) {
            return res.status(400).send({
                message: "required field cannot be empty"
            });
        }

        //Check if there is duplicate RKA
        const RKAExist = await RKA.isRKAExist(unit, sub_unit, rincian_belanja);
        if(RKAExist){
            return res.status(400).send({
                message: "There are duplicate records"
            });
        }

        const alokasi_ado = await pagu.getAlokasiPagu(unit, ADO, year);
        const penggunaan_ado = await pagu.getPenggunaanPagu(unit, ADO, year);
        const alokasi_RKA = rancangan.januari + rancangan.februari + rancangan.maret + rancangan.april + rancangan.mei + rancangan.juni + rancangan.juli + rancangan.agustus + rancangan.september + rancangan.oktober + rancangan.november + rancangan.desember;

        if ((alokasi_RKA + penggunaan_ado) > alokasi_ado) {
            return res.status(400).send({
                message: "insufficient funds"
            });
        }

        const newRKA = await RKA.createRKA(unit, sub_unit, req.body, penggunaanAwal, alokasi_RKA, 0);
        const newPagu = await pagu.changePenggunaanPagu(unit, ADO, year, alokasi_RKA);
        
        console.log(newPagu);
        return res.status(201).send(newRKA);
    } catch (err) {
        return res.status(500).send(err);
    }
};

export const deleteRKA = async (req, res) => {
    try {
        const unit = req.params.unit;
        const sub_unit = req.params.subunit; 
        const {rincian_belanja} = req.body;
        
        const rka = await RKA.getRKA(unit, sub_unit, rincian_belanja);

        const year = rka.year;
        const ADO = rka.ADO;
        const total_rancangan = rka.total_rancangan;

        const deletedRKA = await RKA.deleteRKA(unit, sub_unit, rincian_belanja);
        const newPagu = await pagu.changePenggunaanPagu(unit, ADO, year, -total_rancangan);

        return res.status(200).send(deletedRKA);
    } catch (err) {
        if (err.name === "RKANotFound") 
            return res.status(404).send({
                message: err.message
            });

        return res.status(500).send(err);
    }
}

//Input Pengeluaran
export const inputPengeluaran = async (req, res) => {
    try {
        const unit = req.params.unit;
        const sub_unit = req.params.subunit; 
        const {rincian_belanja, amount} = req.body;

        const RKAExist = await RKA.isRKAExist(unit, sub_unit, rincian_belanja);
        if(!RKAExist){
            return res.status(400).send({
                message: "RKA cannot be found"
            });
        }

        const rka = await RKA.getRKA(unit, sub_unit, rincian_belanja);

        const total_penggunaan = rka.total_penggunaan;
        const total_rancangan = rka.total_rancangan;

        if(total_penggunaan + amount > total_rancangan){
            return res.status(400).send({
                message: "insufficient funds"
            });
        }

        //TODO Gimana cara ngemap bulan sekarang buat nambahin penggunaan bulan ini sejumlah amount
        const updatedRKA = await RKA.inputPengeluaran(unit, sub_unit, rincian_belanja, amount);

        console.log(updatedRKA);

        
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