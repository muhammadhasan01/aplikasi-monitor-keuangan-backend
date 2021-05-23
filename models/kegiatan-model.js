import mongoose from 'mongoose';

const kegiatanSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  subkegiatan: {
    type: String,
    required: true,
    trim: true,
  }
});

const kegiatanModel = mongoose.model('kegiatans', kegiatanSchema);

export const getKegiatans = async () => {
  const kegiatans = await kegiatanModel.find();
  return kegiatans;
}

export const getSubKegiatans = async () => {
  const subKegiatans = await kegiatanModel.distinct("subkegiatan");
  return subKegiatans;
}

export const createKegiatan = async ({name, subkegiatan}) => {
  const newKegiatan = new kegiatanModel({name, subkegiatan});
  const kegiatanCreated = await newKegiatan.save();
  return kegiatanCreated;
}

export const getKegiatan = async (id) => {
  const kegiatan = await kegiatanModel.findById(id);
  if (!kegiatan) {
    throw {name: "kegiatanNotFound", message: `kegiatan with ${id} was not found`};
  }
  return kegiatan;
}

export const updateKegiatan = async (id, data) => {
  const updatedKegiatan = await kegiatanModel.findByIdAndUpdate(id, data, {new: true});
  if (!updatedKegiatan) {
    throw {name: "kegiatanNotFound", message: `kegiatan with ${id} was not found`};
  }
  return updatedKegiatan;
}

export const deleteKegiatan = async (id) => {
  const deletedKegiatan = await kegiatanModel.findByIdAndRemove(id);
  return deletedKegiatan;
}