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

  total_rancangan: {
    type: Number
  },

  total_penggunaan: {
    type: Number
  },

}, {
  timestamps: {createdAt: "createdAt", updatedAt: "updatedAt"},
});

export const RKAModel = mongoose.model('rka', RKASchema);

export const getAllRKA = async () => {
  return await RKAModel.find().sort({year: -1});
}

export const getRancangan = async () => {
  const RKA = await RKAModel.find();
  return RKA[0].rancangan;
}

export const getPenggunaan = async () => {
  const RKA = await RKAModel.find();
  return RKA[0].penggunaan;
}


export const getRKA = async (unit, subunit, rincian) => {
  const queryRKA = await RKAModel.findOne({unit: unit, sub_unit: subunit, rincian_belanja: rincian});
  if (!queryRKA) {
    throw {name: "RKANotFound", message: `RKA ${unit} subunit ${unit} untuk ${rincian} tidak ditemukan`};
  }
  return queryRKA;
}

export const isRKAExist = async (unit, subunit, rincian) => {
  const queryRKA = await RKAModel.findOne({unit: unit, sub_unit: subunit, rincian_belanja: rincian});
  if (!queryRKA) {
    return false;
  }
  return queryRKA;
}

export const getPenggunaanRKA = async (unit, subunit, rincian) => {
  const queryRKA = await RKAModel.findOne({unit: unit, sub_unit: subunit, rincian_belanja: rincian});
  if (!queryRKA) {
    throw {name: "RKANotFound", message: `RKA ${unit} subunit ${unit} untuk ${rincian} tidak ditemukan`};
  }
  return queryRKA.penggunaan;
}

export const getRKAUnit = async (unit, subunit) => {
  const queryRKA = await RKAModel.find({unit: unit, sub_unit: subunit});
  if (!queryRKA) {
    throw {name: "RKANotFound", message: `RKA ${unit} subunit ${unit} tidak ditemukan`};
  }
  return queryRKA;
}

export const getRKAUnitADO = async (unit, subunit, ADO) => {
  const queryRKA = await RKAModel.find({unit: unit, sub_unit: subunit, ADO: ADO});
  if (!queryRKA) {
    throw {name: "RKANotFound", message: `RKA ${unit} subunit ${unit} tidak ditemukan`};
  }
  return queryRKA;
}

export const ambilAlokasiRKA = async (id, bulanDitambah, bulanDikurang, jumlah) => {
  const RKA = await RKAModel.findById(id);
  const {penggunaan, rancangan} = RKA;
  const sisa = rancangan[bulanDikurang] - penggunaan[bulanDikurang];
  if (jumlah > sisa || jumlah < 0) {
    throw new Error("JUMLAH");
  }
  rancangan[bulanDikurang] -= jumlah;
  rancangan[bulanDitambah] += jumlah;
  await RKAModel.findByIdAndUpdate(id, {$set: {rancangan}});
  return await RKAModel.findById(id);
}

export const createRKA = async (unit, sub_unit, {
  year,
  ADO,
  kegiatan,
  subkegiatan,
  rincian_subkegiatan,
  rincian_belanja,
  jenis_belanja,
  satuan,
  volume,
  rancangan
}, penggunaan, total_rancangan, total_penggunaan) => {
  const newRKA = new RKAModel({
    year,
    unit,
    sub_unit,
    ADO,
    kegiatan,
    subkegiatan,
    rincian_subkegiatan,
    rincian_belanja,
    jenis_belanja,
    satuan,
    volume,
    rancangan,
    penggunaan,
    total_rancangan,
    total_penggunaan
  });
  return await newRKA.save();
}

export const deleteRKA = async (unit, sub_unit, rincian_belanja) => {
  return await RKAModel.findOneAndRemove({unit: unit, sub_unit: sub_unit, rincian_belanja: rincian_belanja});
}

