import express from 'express';
import * as ADO from '../models/ado-model.js';

const router = express.Router();


export const getDistinctADOs = async (req, res) => {
    try {
        const ado = await ADO.getDistinctADOs();
        return res.status(200).send(ado);
    } catch (err) {
        return res.status(500).send(err);
    }
};



export default router