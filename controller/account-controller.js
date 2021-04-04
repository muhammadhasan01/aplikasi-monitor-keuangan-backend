import express from 'express';
import * as Accounts from '../models/account-model.js';

const router = express.Router();

export const getAccounts = async (req, res) => {
    try {
        const accounts = await Accounts.getAccounts();
        return res.status(200).send(accounts);
    } catch (err) {
        return res.status(500).send(err);
    }
};

export const getAccount = async (req, res) => {
    try {
        const account = await Accounts.getAccount(req.params.id);
        return res.status(200).send(account);
    } catch (err) {
        if (err.name === "accountNotFound")
            return res.status(404).send({
                message: err.message
            });
        return res.status(500).send(err);
    }
};

export const getUsername = async (req, res) => {
    try {
        const account = await Accounts.getUsername(req.params.uname);
        return res.status(200).send(account);
    } catch (err) {
        if (err.name === "accountNotFound")
            return res.status(404).send({
                message: err.message
            });
        return res.status(500).send(err);
    }
};

export const createAccount = async (req, res) => {
    try {
        const {ID_unit, name, username, email, userType, password} = req.body;
        if (!ID_unit || !name || !username || !email || !userType || !password) {
            //print(req.body);
            return res.status(400).send({
                message: "required field cannot be empty"
            });
        }
        const newAccount = await Accounts.createAccount(req.body);
        return res.status(201).send(newAccount);
    } catch (err) {
        return res.status(500).send(err);
    }
};

export const updateAccount = async (req, res) => {
    try {
        const {ID_unit, name, username, email, userType, password} = req.body;
        if (!ID_unit || !name || !username || !email || !userType || !password) {
            return res.status(400).send({
                message: "required field cannot be empty"
            });
        }
        const newAccount = await Accounts.updateAccount(req.params.id, req.body);
        return res.status(200).send(newAccount);
    } catch (err) {
        if (err.name === "accountNotFound")
            return res.status(404).send({
                message: err.message
            });
        return res.status(500).send(err);
    }
}

export const deleteAccount = async (req, res) => {
    try {
        const deletedAccount = await Accounts.deleteAccount(req.params.id);
        return res.status(200).send(deletedAccount);
    } catch (err) {
        if (err.name === "accountNotFound")
            return res.status(404).send({
                message: err.message
            });
        return res.status(500).send(err);
    }
}

export default router