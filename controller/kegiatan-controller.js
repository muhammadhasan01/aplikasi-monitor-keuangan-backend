import express from 'express';
import * as Kegiatan from '../models/kegiatan-model.js';

const router = express.Router();

export const getKegiatans = async (req, res) => {
    try {
        const kegiatans = await Kegiatan.getKegiatans();
        return res.status(200).send(kegiatans);
    } catch (err) {
        return res.status(500).send(err);
    }
};

export const getSubKegiatans = async (req, res) => {
    try {
        const subkegiatans = await Kegiatan.getSubKegiatans();
        return res.status(200).send(subkegiatans);
    } catch (err) {
        return res.status(500).send(err);
    }
};

export const getKegiatan = async (req, res) => {
    try {
        const kegiatan = await Kegiatan.getKegiatan(req.params.id);
        return res.status(200).send(kegiatan);
    } catch (err) {
        if (err.name === "kegiatanNotFound")
            return res.status(404).send({
                message: err.message
            });
        return res.status(500).send(err);
    }
};

export const createKegiatan = async (req, res) => {
    try {
        const {name, subkegiatan} = req.body;
        if (!name || !code || !subkegiatan) {
            res.status(400).send({
                message: "required field cannot be empty"
            })
        }
        const newUser = await Kegiatan.createKegiatan(req.body);
        return res.status(201).send(newUser);
    } catch (err) {
        return res.status(500).send(err);
    }
};

export const updateKegiatan = async (req, res) => {
    try {
        const {name, subkegiatan} = req.body;
        if (!name || !subkegiatan) {
            res.status(400).send({
                message: "required field cannot be empty"
            })
        }
        const newUser = await Kegiatan.updateKegiatan(req.params.id, req.body);
        return res.status(200).send(newUser);
    } catch (err) {
        if (err.name === "kegiatanNotFound")
            return res.status(404).send({
                message: err.message
            });
        return res.status(500).send(err);
    }
}

export const deleteKegiatan = async (req, res) => {
    try {
        const deletedKegiatan = await Kegiatan.deleteKegiatan(req.params.id);
        return res.status(200).send(deletedKegiatan);
    } catch (err) {
        if (err.name === "kegiatanNotFound")
            return res.status(404).send({
                message: err.message
            });
        return res.status(500).send(err);
    }
}

export default router