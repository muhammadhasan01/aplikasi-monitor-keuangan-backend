import mongoose from 'mongoose';
let Schema = mongoose.Schema;

const RKASchema = Schema({
    year: {
        type: Date,
        required: true,
    },
    ID_unit: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'unit',
    },
    ID_ADO: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'ados',
    },
    ID_kegiatan: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'kegiatan',
    },
    ID_belanja: {
        type: Scema.Types.ObjectId,
        required: true,
        ref: 'belanja',
    },
    rincian_subkegiatan: {
        type: String,
        required: true,
    },
    rincian_belanja: {
        type: String,
        required: true,
    },
    satuan: {
        type: String,
        required: true,
    },
    jumlah: {
        type: Number,
        required: True,
    },
}, {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
});

const RKAModel = mongoose.model('RKA', RKASchema);