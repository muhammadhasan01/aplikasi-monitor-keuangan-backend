import {getToken} from "../auth/jwt-token.js";
import {AccountModel, checkPassword, getUsername} from "../models/account-model.js";
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import Bcrypt from "bcryptjs";

dotenv.config();

export const login = async (req, res) => {
  try {
    const {username, password} = req.body;
    if (!username || !password) {
      return res.status(400).json({
        message: "Input fields cannot be empty"
      });
    }
    const user = await AccountModel.findOne({username: username});
    if (!user) {
      return res.status(400).json({
        message: "The given username was not found"
      });
    }
    let validPassword = await checkPassword(user.username, password);
    if (!validPassword) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }
    const token = getToken(user);
    return res.status(200).send(token);
  } catch (err) {
    return res.status(500).send(err);
  }
}


export const resetPassword = async (req, res) => {
  try {
    const {username, newPassword, newPasswordConfirmation} = req.body;
    if (newPassword !== newPasswordConfirmation) {
      return res.status(400).json({
        message: "Password doesn't match"
      });
    }
    const user = await getUsername(username);
    if (!user) {
      return res.status(400).json({
        message: "The given username was not found"
      });
    }
    await AccountModel.findOneAndUpdate({username}, {$set: {password: Bcrypt.hashSync(newPassword, 10)}})
    return res.status(200).json({
      message: "Password has been successfully reset"
    });
  } catch (err) {
    return res.status(500).send(err);
  }
}

export const sendResetLink = async (req, res) => {
  try {
    const {username} = req.body;
    const user = await getUsername(username);
    const {email} = user;
    const {EMAIL_FOR_RESET, EMAIL_SERVICE, PASSWORD_FOR_RESET} = process.env;
    const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3000';
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 465,
      secure: true, // true for 465, false for other ports
      logger: true,
      debug: true,
      secureConnection: false,
      tls: {
        rejectUnAuthorized: true
      },
      auth: {
        user: EMAIL_FOR_RESET,
        pass: PASSWORD_FOR_RESET
      }
    });
    const tokenUsername = getToken(user);
    const mailOptions = {
      from: EMAIL_FOR_RESET,
      to: email,
      subject: 'Reset Password Monitoring Anggaran STEI',
      text: `Untuk melakukan pengulangan kata sandi gunakan link berikut: ${SERVER_URL}/reset/${tokenUsername} (akan hangus dalam 5 jam)`,
      html: `Untuk melakukan pengulangan kata sandi gunakan link berikut: <br /> <a>${SERVER_URL}/reset/${tokenUsername}</a>
              (<b>Link akan hangus dalam 5 jam</b>)`
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(500).send(error);
      }
      console.log('Email sent: ' + info.response);
      return res.status(200).send(info.response);
    });
  } catch (err) {
    return res.status(500).send(err);
  }
}
