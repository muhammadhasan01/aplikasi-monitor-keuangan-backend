import * as Accounts from '../models/account-model.js';

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
    const {unit, subunit, name, username, email, userType, password} = req.body;
    if (!unit || !subunit || !name || !username || !email || !userType || !password) {
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
    const {unit, subunit, name, username, email, userType, password} = req.body;
    if (!unit || !subunit || !name || !username || !email || !userType || !password) {
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

export const changePassword = async (req, res) => {
  try {
    const {id} = req.params;
    const {password} = req.body;
    if (!password) {
      return res.status(400).send({
        message: "password field is required"
      });
    }
    const ret = await Accounts.changePassword(id, password);
    return res.status(200).send(ret);
  } catch (err) {
    return res.status(500).send(err);
  }
}