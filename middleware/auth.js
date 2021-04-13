import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { JWT_SECRET } = process.env;

export default (req, res, next) => {
    try {
        const token = req.header.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, JWT_SECRET);
        req.userData = {
            username: decodedToken.username,
            userID: decodedToken.userID,
            unit: decodedToken.unit,
            subunit: decodedToken.subunit,
            type: decodedToken.userType
        };
        next();
    } catch (err) {
        res.status(401).json({ message: 'not authorized' });
    }
}

