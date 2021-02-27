import mongoose from 'mongoose';
let Schema = monggose.Schema;

const expenseHistorySchema = Schema({
    ID_RKA: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    expense_date: {
        type: Date,
        unique: true,
        default: Date.now(),
    },
    jumlah: {
        type: Number,
        required: true,
    },
}, {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
});

const ExpenseHistoryModel = mongoose.model('expenseHistory', expenseHistorySchema);