import mongoose from 'mongoose';
import Bcrypt from 'bcryptjs';

let Schema = mongoose.Schema;

const accountSchema = Schema({
    unit: {
        type: String,
        required: true,
        trim: true,
    },
    subunit: {
        type: String,
        required: true,
        trim: true
    },
    name : {
      type: String,
      required: true,
      trim: true,
      minlength: 3
    },
    username: {
        type: String,
        trim: true,
        index: true,
        unique: true,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        trim: true,
        index: true,
        unique: true,
        required: true,
    },
    userType: {
        type: String,
        enum: ["Admin", "User"],
        default: "User",
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        selected: false,
    }
}, {
    strict: true,
    versionKey: false,
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
});

export const AccountModel = mongoose.model('account', accountSchema);

export const getAccounts = async () => {
    try {
        return await AccountModel.find();
    } catch (err) {
        throw err;
    }
}

export const getAccount = async (id) => {
    try {
        const account = await AccountModel.findById(id);
        if (!account) {
            throw {name: "accountNotFound", message: `account with ID ${id} was not found`};
        }
        return account;
    } catch (err) {
        throw err;
    }
}

export const getUsername = async(uname) =>{
    try {
        const account = await AccountModel.findOne({username: uname});
        if (!account) {
            throw {name: "accountNotFound", message: `Account with username ${uname} was not found`};
        }
        return account;
    } catch (err) {
        throw err;
    }
}

export const createAccount = async ({ unit, subunit, name, username, email, userType, password }) => {
    password = Bcrypt.hashSync(password, 10);
    const newAccount = new AccountModel({ unit, subunit, name, username, email, userType, password });
    try {
        const accountCreated = await newAccount.save();
        return accountCreated;
    } catch (err) {
        throw err;
    }
}

export const updateAccount = async (id, data) => {
    try {
        data.password = Bcrypt.hashSync(data.password, 10);
        const updatedAccount = await AccountModel.findByIdAndUpdate(id, data, {new: true});
        if (!updatedAccount) {
            throw {name: "accountNotFound", message: `account with ID ${id} was not found`};
        }
        return updatedAccount;
    } catch (err) {
        throw err;
    }
}

export const deleteAccount = async (id) => {
    try {
        return await AccountModel.findByIdAndRemove(id);
    } catch (err) {
        throw err;
    }
}

export const changePassword = async (id, password) => {
    try {
        password = Bcrypt.hashSync(password, 10);
        return await AccountModel.findByIdAndUpdate(id, { $set: { password: password } });
    } catch (err) {
        throw err;
    }
}

export const checkPassword = async (username, password) => {
    const account = await AccountModel.findOne({ username: username }).select('password');
    return Bcrypt.compareSync(password, account.password);
}