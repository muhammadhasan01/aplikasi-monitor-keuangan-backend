import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()

const { JWT_SECRET } = process.env;

export const getToken = (user) => {
    console.log("JWT", JWT_SECRET);
    return jwt.sign(
        {
            username: user.username,
            userID: user._id,
            unit: user.unit,
            subunit: user.subunit,
            type: user.userType
        },
        JWT_SECRET,
        { expiresIn: "3h" }
    );
}