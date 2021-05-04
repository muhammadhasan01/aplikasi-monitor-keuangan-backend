import * as Pengeluaran from '../models/pengeluaran-model.js';
import * as RKA from '../models/RKA-model.js';

export const getAllPengeluaran = async (req, res) => {
    try {
        const pengeluaran = await Pengeluaran.getAllPengeluaran();
        return res.status(200).send(pengeluaran);
    } catch (err) {
        return res.status(500).send(err);
    }
}

export const getPengeluaran = async (req, res) => {
    try {
        const { id } = req.params;
        const pengeluaran = await Pengeluaran.getPengeluaran(id);
        return res.status(200).send(pengeluaran);
    } catch (err) {
        return res.status(500).send(err);
    }
}

export const getPengeluaranUnit = async (req, res) => {
    try {
        const { unit } = req.params;
        if (!unit) {
            return res.status(400).send({
                message: "required field cannot be empty"
            });
        }
        const pengeluaran = Pengeluaran.getAllPengeluaranUnit(unit);
        return res.status(200).send(pengeluaran);
    } catch (err) {
        return res.status(500).send(err);
    }
}

export const updatePengeluaran = async (req, res) => {
    try {
        const { id } = req.params;
        const { amount } = res.body;
        if (!amount) {
            return res.status(400).send({
                message: "required fields cannot be empty"
            });
        }
        const updatedPengeluaran = await Pengeluaran.updatePengeluaran(id, amount);
        return res.status(200).send(updatedPengeluaran);
    } catch (err) {
        return res.status(500).send(err);
    }
}

export const removePengeluaran = async (req, res) => {
    try {
        const { id } = req.params;
        const removedPengeluaran = await Pengeluaran.removePengeluaran(id);
        return res.status(200).send(removedPengeluaran);
    } catch (err) {
        return res.status(500).send(err);
    }
}

export const inputPengeluaran = async (req, res) => {
    try {
        const { unit, sub_unit, rincian_belanja, amount, bulan } = req.body;
        console.log(req.body);
        if (!unit || !sub_unit || !rincian_belanja || !amount || !bulan) {
            return res.status(400).send({
                message: "required field cannot be empty"
            });
        }
        const RKAExist = await RKA.isRKAExist(unit, sub_unit, rincian_belanja);
        if (!RKAExist) {
            return res.status(400).send({
                message: "RKA cannot be found"
            });
        }
        const updatedRKA = await Pengeluaran.inputPengeluaran(RKAExist._id, amount, bulan);
        return res.status(200).send(updatedRKA);
    } catch (err) {
        if (err.name === "paguNotFound")
            return res.status(404).send({
                message: err.message
            });
        return res.status(500).send(err);
    }
};