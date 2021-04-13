import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()

const { JWT_SECRET } = process.env;

export const getToken = (user) => {
    // TODO: Fix payload token
    return jwt.sign(
        { username: user.username, userID: user._id, unit: user.unit, type: user.userType },
        JWT_SECRET,
        { expiresIn: "3h" }
    );
}