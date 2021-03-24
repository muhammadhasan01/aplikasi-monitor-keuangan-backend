// import express from 'express';
import {getUsername} from '../models/account-model.js';
import dotenv from 'dotenv';

dotenv.config();

// const router = express.Router();

describe('Get Username Function Testing', () =>{
    it("Should return an account with username harry", ()=> {
        const unameQuery = getUsername("harry");
        assert.equal(unameQuery[0].username, "harry");
    });

    it("Should return error message", () => {
        const unameQuery = Accounts.getUsername("somerandomusername");
        assert.equal(unameQuery[0].message, "Account with username somerandomusername was not found");
    });
})


