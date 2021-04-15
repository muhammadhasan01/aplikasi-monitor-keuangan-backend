import mongoose from 'mongoose';
let Schema = mongoose.Schema;

const PaguSchema = Schema({
    unit: {
        type: String,
        required: true,
        ref: 'unit',
    },
    ADO: {
        type: String,
        required: true,
        ref: 'ados',
    },
    year: {
        type: Number,
        required: true,
    },
    alokasi: {
        type: Number,
        required: true,
    },
    penggunaan: {
        type: Number,
        required: true,
    },
}, {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
});

const PaguModel = mongoose.model('pagu', PaguSchema);

export const getAllPagu = async () => {
    try {
        const pagu = await PaguModel.find();
        return pagu;
    } catch (err) {
        throw err;
    }
}

export const getPagu = async(unit, ado, year) => {
    try{
        const queryPagu = await PaguModel.findOne({unit: unit, ADO: ado, year: new Date(year)});
        if (!queryPagu) {
            throw {name: "paguNotFound", message: `Pagu anggaran ${unit} untuk ${ado} tahun ${year} tidak ditemukan`};
        }
        return queryPagu;
    } catch (err) {
        throw err;
    }
}

export const insertNewPagu = async(unit, ADO, year, alokasi, penggunaan) => {
    const newPagu = new PaguModel({unit, ADO, year, alokasi, penggunaan})
    try {
        const paguCreated = await newPagu.save();
        return paguCreated;
    } catch (err) {
        throw err;
    }
}

export const updateAlokasiPagu = async(unit, ADO, year, value) =>{
    try{
        const updatedPagu = await PaguModel.findOneAndUpdate({unit: unit, ADO: ADO, year: new Date(year)}, {alokasi: value}, {new: true});
        if (!updatedPagu) {
            throw {name: "paguNotFound", message: `Update pagu anggaran ${ADO} untuk ${unit} tahun ${year} tidak berhasil`};
        }
        return updatedPagu;
    } catch (err) {
        throw err;
    }
} 

export const changePenggunaanPagu = async(unit, ADO, year, amount) =>{
    try{
        const updatedPagu = await PaguModel.findOneAndUpdate({unit: unit, ADO: ADO, year: year}, {$inc: {penggunaan: amount}}, {new: true});
        if (!updatedPagu) {
            throw {name: "paguNotFound", message: `Update pagu anggaran ${ADO} untuk ${unit} tahun ${year} tidak berhasil`};
        }
        return updatedPagu;
    } catch (err) {
        throw err;
    }
} 

export const getAlokasiPagu = async(unit, ADO, year) => {
    try{
        console.log(year);
        const queryPagu = await PaguModel.findOne({unit: unit, ADO: ADO, year: year});
        console.log(queryPagu)
        if (!queryPagu) {
            throw {name: "paguNotFound", message: `Alokasi Pagu anggaran ${ADO} untuk ${unit} tahun ${year} tidak ditemukan`};
        }
        return queryPagu.alokasi;
    } catch (err) {
        throw err;
    }
}

export const getPenggunaanPagu = async(unit, ADO, year) => {
    try{
        const queryPagu = await PaguModel.findOne({unit: unit, ADO: ADO, year: year});
        if (!queryPagu) {
            throw {name: "paguNotFound", message: `Penggunaan Pagu anggaran ${ADO} untuk ${unit} tahun ${year} tidak ditemukan`};
        }
        return queryPagu.penggunaan;
    } catch (err) {
        throw err;
    }
}

export const getSisaPagu = async(unit, ADO, year) => {
    try{
        const queryPagu = await PaguModel.findOne({unit: unit, ADO: ADO, year: year});
        if (!queryPagu) {
            throw {name: "paguNotFound", message: `Sisa Pagu anggaran ${ADO} untuk ${unit} tahun ${year} tidak ditemukan`};
        }
        return queryPagu.alokasi - queryPagu.penggunaan;
    } catch (err) {
        throw err;
    }
}

