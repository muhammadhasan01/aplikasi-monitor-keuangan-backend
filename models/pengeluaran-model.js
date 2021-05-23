import mongoose from 'mongoose';
import {RKASchema, RKAModel} from "./RKA-model.js";

let Schema = mongoose.Schema;

const pengeluaranSchema = Schema({
  jumlah: {
    type: Number,
    default: 0,
  },
  bulan: {
    type: String,
    trim: true
  },
  RKA: {
    type: RKASchema
  }
}, {
  timestamps: {createdAt: "createdAt", updatedAt: "updatedAt"},
});

const PengeluaranModel = mongoose.model('pengeluaran', pengeluaranSchema);

export const getAllPengeluaran = async () => {
  return await PengeluaranModel.find().sort({_id: -1});
}

export const getAllPengeluaranUnit = async (unit) => {
  const pengeluaran = PengeluaranModel.find({unit: unit}).sort({_id: -1});
  return pengeluaran;
}

export const getPengeluaran = async (id) => {
  return await PengeluaranModel.findById(id);
}

export const removePengeluaran = async (id) => {
  return await PengeluaranModel.findByIdAndRemove(id);
}

export const removeAllPengeluaran = async () => {
  return await PengeluaranModel.remove();
}

export const updatePengeluaran = async (id, amount) => {
  return await PengeluaranModel.findByIdAndUpdate(id, {$inc: {jumlah: amount}});
}

export const inputPengeluaran = async (id, amount, bulan) => {
  const RKA = await RKAModel.findById(id);
  const {penggunaan} = RKA;
  penggunaan[bulan] += amount;
  // Update RKA
  await RKAModel.findByIdAndUpdate(id, {$set: {penggunaan: penggunaan}}, {multi: true});
  const updatedRKA = await RKAModel.findById(id);
  // Update Riwayat Input Pengeluaran
  const pengeluaran = new PengeluaranModel({jumlah: amount, RKA: updatedRKA, bulan});
  await pengeluaran.save();
  return pengeluaran;
}


export const undoPengeluaran = async (id) => {
  const pengeluaran = await PengeluaranModel.findById(id);
  const {RKA: {_id}, bulan, jumlah} = pengeluaran;
  const RKA = await RKAModel.findById(_id);
  const {penggunaan} = RKA;
  penggunaan[bulan] -= jumlah;
  // Update RKA
  await RKAModel.findByIdAndUpdate(_id, {$set: {penggunaan: penggunaan}}, {multi: true});
  // Remove data pengeluaran
  return await removePengeluaran(id);
}