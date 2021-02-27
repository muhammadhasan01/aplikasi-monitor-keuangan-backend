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
    },email: {
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