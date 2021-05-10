import {getToken} from "../auth/jwt-token.js";
import { AccountModel, checkPassword, getUsername } from "../models/account-model.js";
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({
               message: "Input fields cannot be empty"
            });
        }
        const user = await AccountModel.findOne({ username: username });
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
        const { username, newPassword, newPasswordConfirmation } = req.body;
        if (newPassword !== newPasswordConfirmation) {
            return res.status(400).json({
               message: "Password doesn't match"
            });
        }
        else{
            const user = await getUsername(username);
            if (!user) {
                return res.status(400).json({
                    message: "The given username was not found"
                });
            }
            else{
                user.password = newPassword
                updateUser(user);
            }
            return res.status(200).json({
                message: "Password has been successfully reset"
            });
        }
    } catch (err) {
        return res.status(500).send(err);
    }
}

export const sendResetLink = async (req, res) => {
    try {
        const { username } = req.body;
        console.log(username);
        const user = await getUsername(username);
        console.log("user", user);
        const { EMAIL_FOR_RESET, EMAIL_SERVICE, PASSWORD_FOR_RESET } = process.env;
        const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3000';
        const transporter = nodemailer.createTransport({
          service: EMAIL_SERVICE,
          auth: {
            user: EMAIL_FOR_RESET,
            pass: PASSWORD_FOR_RESET
          }
        });
        const tokenUsername = getToken(user);
        const mailOptions = {
          from: EMAIL_FOR_RESET,
          to: user.email,
          subject: 'Reset Password Monitoring Anggaran STEI',
          text: `To reset your password, please click on this link: ${SERVER_URL}/reset/` + tokenUsername
        };
        transporter.sendMail(mailOptions, function(error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
    } catch (err) {
        return res.status(500).send(err);
    }
}
