import * as Accounts from '../controller/account-controller.js';
import express from 'express';

const router = express.Router();

router.get('', Accounts.getAccounts);
router.get('/:id', Accounts.getAccount);
router.post('', Accounts.createAccount);
router.put('/:id', Accounts.updateAccount);
router.delete('/:id', Accounts.deleteAccount);

export default router;