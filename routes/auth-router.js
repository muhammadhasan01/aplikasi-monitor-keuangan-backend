import express from "express";
import * as Auths from '../controller/auth-controller.js';

const router = express.Router();

router.post('/login', Auths.login);
router.post('/reset', Auths.reset);
router.post('/sendResetLink', Auths.sendResetLink);
router.post('/resetPassword', Auths.resetPassword );

export default router; 