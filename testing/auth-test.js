import {getToken} from '../auth/jwt-token.js';
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";

dotenv.config();

const { JWT_SECRET } = process.env;

describe('JWT Token', () => {
    it('should return a valid jwt token', (done) => {
        const user = {
            username: 'test',
            unit: 'unit',
            userType: 'User'
        }
        const token = getToken(user);
        const { username, unit, type } = jwt.verify(token, JWT_SECRET);
        if (username != user.username || unit != user.unit || type != user.userType) {
            done(new Error("JWT Token not valid"));
        } else {
            done();
        }
    })
})