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

const RKASchema = Schema({
    year: {
        type: Date,
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

    penggunaan: pengeluaranBulanan,

}, {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
});

const RKAModel = mongoose.model('rka', RKASchema);

export const getAllRKA = async () => {
    try {
        const RKA = await RKAModel.find();
        console.log(RKA)
        return RKA;
    } catch (err) {
        throw err;
    }
}

export const getPengeluaran = async () => {
    try {
        const RKA = await RKAModel.find();
        console.log(RKA[0].penggunaan.februari)
        console.log(RKA[0])
        return RKA[0].penggunaan;
    } catch (err) {
        throw err;
    }
}

export const getRKA = async(unit, subunit, rincian) => {
    try{
        const queryRKA = await RKAModel.findOne({unit: unit, sub_unit: subunit, rincian_belanja: rincian});
        if (!queryRKA) {
            throw {name: "RKANotFound", message: `RKA ${unit} subunit ${unit} untuk ${rincian_belanja} tidak ditemukan`};
        }
        return queryRKA;
    } catch (err) {
        throw err;
    }
}

export const getPengeluaranRKA = async(unit, subunit, rincian) => {
    try{
        const queryRKA = await RKAModel.findOne({unit: unit, sub_unit: subunit, rincian_belanja: rincian});
        if (!queryRKA) {
            throw {name: "RKANotFound", message: `RKA ${unit} subunit ${unit} untuk ${rincian_belanja} tidak ditemukan`};
        }
        return queryRKA.penggunaan;
    } catch (err) {
        throw err;
    }
}

