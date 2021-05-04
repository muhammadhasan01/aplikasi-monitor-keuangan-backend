import mongoose from 'mongoose';
import { RKASchema, RKAModel } from "./RKA-model.js";
let Schema = mongoose.Schema;

const pengeluaranSchema = Schema({
    jumlah: {
        type: Number,
        default: 0,
    },
    RKA: {
        type: RKASchema
    }
}, {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
});

const PengeluaranModel = mongoose.model('pengeluaran', pengeluaranSchema);

export const getAllPengeluaran = async () => {
    try {
        return await PengeluaranModel.find().sort({ _id: -1 });
    } catch (err) {
        throw err;
    }
}

export const getAllPengeluaranUnit = async (unit) => {
    try {
        const pengeluaran = PengeluaranModel.find({ unit: unit }).sort({ _id: -1 });
        return pengeluaran;
    } catch (err) {
        throw err;
    }
}

export const getPengeluaran = async (id) => {
    try {
        return await PengeluaranModel.findById(id);
    } catch (err) {
        throw err;
    }
}

export const removePengeluaran = async (id) => {
    try {
        return await PengeluaranModel.findByIdAndRemove(id);
    } catch (err) {
        throw err;
    }
}

export const updatePengeluaran = async (id, amount) => {
    try {
        return await PengeluaranModel.findByIdAndUpdate(id, { $inc: { jumlah: amount } });
    } catch (err) {
        throw err;
    }
}

export const inputPengeluaran = async (id, amount, bulan) => {
    try {
        const RKA = await RKAModel.findById(id);
        const { penggunaan } = RKA;
        penggunaan[bulan] += amount;
        // Update RKA
        await RKAModel.findByIdAndUpdate(id, {$set: { penggunaan: penggunaan } }, { multi: true });
        const updatedRKA = await RKAModel.findById(id);
        // Update Riwayat Input Pengeluaran
        const pengeluaran = new PengeluaranModel({ jumlah: amount, RKA: updatedRKA });
        await pengeluaran.save();
        return updatedRKA;
    } catch (err) {
        throw err;
    }
}
