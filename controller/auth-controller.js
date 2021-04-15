import {getToken} from "../auth/jwt-token.js";
import {AccountModel, checkPassword} from "../models/account-model.js";

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