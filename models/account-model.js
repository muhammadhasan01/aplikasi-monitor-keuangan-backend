import mongoose from 'mongoose';
let Schema = mongoose.Schema;

const accountSchema = Schema({
    ID_unit: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'unit',
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
        select: false,
    },
}, {
    strict: true,
    versionKey: false,
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
});

const AccountModel = mongoose.model('account', accountSchema);

export const getAccounts = async () => {
    try {
        const accounts = await AccountModel.find();
        return accounts;
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

export const createAccount = async ({ ID_unit, name, username, email, userType, password }) => {
    const newAccount = new AccountModel({ ID_unit, name, username, email, userType, password });
    try {
        const accountCreated = await newAccount.save();
        return accountCreated;
    } catch (err) {
        throw err;
    }
}

export const updateAccount = async (id, data) => {
    try {
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
        const deletedAccount = await AccountModel.findByIdAndRemove(id);
        return deletedAccount;
    } catch (err) {
        throw err;
    }
}