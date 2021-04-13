import express from "express";
import * as Auths from '../controller/auth-controller.js';

const router = express.Router();

router.post('/login', Auths.login);

export default router;