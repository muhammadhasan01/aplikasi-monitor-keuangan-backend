import mongoose from 'mongoose';
let Schema = mongoose.Schema;

const pengeluaranBulanan = Schema({
    januari: {
        type: Number,
        default: 0,
    },
    februari: {
        type: Number,
        default: 0,
    },
    maret: {
        type: Number,
        default: 0,
    },
    april: {
        type: Number,
        default: 0,
    },
    mei: {
        type: Number,
        default: 0,
    },
    juni: {
        type: Number,
        default: 0,
    },
    juli: {
        type: Number,
        default: 0,
    },
    agustus: {
        type: Number,
        default: 0,
    },
    september: {
        type: Number,
        default: 0,
    },
    oktober: {
        type: Number,
        default: 0,
    },
    november: {
        type: Number,
        default: 0,
    },
    desember: {
        type: Number,
        default: 0,
    },

});

export const RKASchema = Schema({
    year: {
        type: Number,
        required: true,
    },
    unit: {
        type: String,
        required: true,
        ref: 'unit',
    },
    sub_unit: {
        type: String,
        required: true,
        ref: 'subunit',
    },
    ADO: {
        type: String,
        required: true,
    },
    kegiatan: {
        type: String,
        required: true,
        ref: 'kegiatan',
    },
    subkegiatan: {
        type: String,
        required: true,
    },
    rincian_subkegiatan: {
        type: String,
        required: true,
        default: "",
    },
    rincian_belanja: {
        type: String,
        required: true,
    },
    jenis_belanja: {
        type: String,
        required: true,
    },
    satuan: {
        type: String,
        required: true,
    },
    volume: {
        type: Number,
        required: true,
    },

    rancangan: pengeluaranBulanan,
    
    penggunaan: pengeluaranBulanan,

    total_rancangan:{
        type: Number
    },

    total_penggunaan: {
        type: Number
    },

}, {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
});

export const RKAModel = mongoose.model('rka', RKASchema);

export const getAllRKA = async () => {
    try {
        const RKA = await RKAModel.find();
        return RKA;
    } catch (err) {
        throw err;
    }
}

export const getRancangan = async () => {
    try {
        const RKA = await RKAModel.find();
        return RKA[0].rancangan;
    } catch (err) {
        throw err;
    }
}

export const getPenggunaan = async () => {
    try {
        const RKA = await RKAModel.find();
        return RKA[0].penggunaan;
    } catch (err) {
        throw err;
    }
}


export const getRKA = async(unit, subunit, rincian) => {
    try{
        const queryRKA = await RKAModel.findOne({unit: unit, sub_unit: subunit, rincian_belanja: rincian});
        if (!queryRKA) {
            throw {name: "RKANotFound", message: `RKA ${unit} subunit ${unit} untuk ${rincian} tidak ditemukan`};
        }
        return queryRKA;
    } catch (err) {
        throw err;
    }
}

export const isRKAExist = async(unit, subunit, rincian) => {
    try{
        const queryRKA = await RKAModel.findOne({ unit: unit, sub_unit: subunit, rincian_belanja: rincian });
        if (!queryRKA) {
            return false;
        }
        return queryRKA;
    } catch (err) {
        throw err;
    }
}

export const getPenggunaanRKA = async(unit, subunit, rincian) => {
    try{
        const queryRKA = await RKAModel.findOne({unit: unit, sub_unit: subunit, rincian_belanja: rincian});
        if (!queryRKA) {
            throw {name: "RKANotFound", message: `RKA ${unit} subunit ${unit} untuk ${rincian} tidak ditemukan`};
        }
        return queryRKA.penggunaan;
    } catch (err) {
        throw err;
    }
}

export const getRKAUnit = async(unit, subunit) => {
    try{
        const queryRKA = await RKAModel.find({unit: unit, sub_unit: subunit});
        if (!queryRKA) {
            throw {name: "RKANotFound", message: `RKA ${unit} subunit ${unit} tidak ditemukan`};
        }
        return queryRKA;
    } catch (err) {
        throw err;
    }
}

export const getRKAUnitADO = async(unit, subunit, ADO) => {
    try{
        const queryRKA = await RKAModel.find({unit: unit, sub_unit: subunit, ADO: ADO});
        if (!queryRKA) {
            throw { name: "RKANotFound", message: `RKA ${unit} subunit ${unit} tidak ditemukan` };
        }
        return queryRKA;
    } catch (err) {
        throw err;
    }
}

export const createRKA = async (unit, sub_unit, { year, ADO, kegiatan, subkegiatan, rincian_subkegiatan, rincian_belanja, jenis_belanja, satuan, volume, rancangan}, penggunaan, total_rancangan, total_penggunaan) => {
    const newRKA = new RKAModel({ year, unit, sub_unit, ADO, kegiatan, subkegiatan, rincian_subkegiatan, rincian_belanja, jenis_belanja, satuan, volume, rancangan, penggunaan, total_rancangan, total_penggunaan});
    try {
        const rkaCreated = await newRKA.save();
        return rkaCreated;
    } catch (err) {
        throw err;
    }
}

export const deleteRKA = async (unit, sub_unit, rincian_belanja) => {
    try {
        const deletedRKA = await RKAModel.findOneAndRemove({ unit: unit, sub_unit: sub_unit, rincian_belanja: rincian_belanja });
        return deletedRKA;
    } catch (err) {
        throw err;
    }
}

