import express from "express";
import * as Auths from '../controller/auth-controller.js';

const router = express.Router();

router.post('/login', Auths.login);
router.post('/send-reset-link', Auths.sendResetLink);
router.post('/reset-password', Auths.resetPassword );

export default router; 