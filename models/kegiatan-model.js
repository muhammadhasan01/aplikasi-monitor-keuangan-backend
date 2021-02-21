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
    try {
        const kegiatans = await kegiatanModel.find();
        return kegiatans;
    } catch (err) {
        throw err;
    }
}

export const getSubKegiatans = async () => {
    try {
        const subKegiatans = await kegiatanModel.distinct("subkegiatan");
        return subKegiatans;
    } catch (err) {
        throw err;
    }
}

export const createKegiatan = async ({ name, subkegiatan }) => {
    const newKegiatan = new kegiatanModel({ name, subkegiatan });
    try {
        const kegiatanCreated = await newKegiatan.save();
        return kegiatanCreated;
    } catch (err) {
        throw err;
    }
}

export const getKegiatan = async (id) => {
    try {
        const kegiatan = await kegiatanModel.findById(id);
        if (!kegiatan) {
            throw {name: "kegiatanNotFound", message: `kegiatan with ${id} was not found`};
        }
        return kegiatan;
    } catch (err) {
        throw err;
    }
}

export const updateKegiatan = async (id, data) => {
    try {
        const updatedKegiatan = await kegiatanModel.findByIdAndUpdate(id, data, {new: true});
        if (!updatedKegiatan) {
            throw {name: "kegiatanNotFound", message: `kegiatan with ${id} was not found`};
        }
        return updatedKegiatan;
    } catch (err) {
        throw err;
    }
}

export const deleteKegiatan = async (id) => {
    try {
        const deletedKegiatan = await kegiatanModel.findByIdAndRemove(id);
        return deletedKegiatan;
    } catch (err) {
        throw err;
    }
}