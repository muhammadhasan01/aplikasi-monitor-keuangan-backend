import mongoose from 'mongoose';

let Schema = mongoose.Schema;

const PaguSchema = Schema({
  unit: {
    type: String,
    required: true,
    ref: 'unit',
  },
  subunit: {
    type: String,
    required: true,
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
  timestamps: {createdAt: "createdAt", updatedAt: "updatedAt"},
});

const PaguModel = mongoose.model('pagu', PaguSchema);

export const getAllPagu = async () => {
  const pagu = await PaguModel.find();
  return pagu;
}

export const getPagu = async (unit, subunit, ado, year) => {
  const queryPagu = await PaguModel.findOne({unit: unit, subunit: subunit, ADO: ado, year: new Date(year)});
  if (!queryPagu) {
    throw {name: "paguNotFound", message: `Pagu anggaran ${unit} untuk ${ado} tahun ${year} tidak ditemukan`};
  }
  return queryPagu;
}

export const insertNewPagu = async (unit, subunit, ADO, year, alokasi, penggunaan) => {
  const newPagu = new PaguModel({unit, subunit, ADO, year, alokasi, penggunaan})
  return await newPagu.save();
}

export const updateAlokasiPagu = async (unit, subunit, ADO, year, value) => {
  const updatedPagu = await PaguModel.findOneAndUpdate({
    unit: unit,
    subunit: subunit,
    ADO: ADO,
    year: year
  }, {alokasi: value}, {new: true});
  if (!updatedPagu) {
    throw {name: "paguNotFound", message: `Update pagu anggaran ${ADO} untuk ${unit} tahun ${year} tidak berhasil`};
  }
  return updatedPagu;
}

export const changePenggunaanPagu = async (unit, subunit, ADO, year, amount) => {
  const updatedPagu = await PaguModel.findOneAndUpdate({
    unit: unit,
    subunit: subunit,
    ADO: ADO,
    year: year
  }, {$inc: {penggunaan: amount}}, {new: true});
  if (!updatedPagu) {
    throw {name: "paguNotFound", message: `Update pagu anggaran ${ADO} untuk ${unit} tahun ${year} tidak berhasil`};
  }
  return updatedPagu;

}

export const getAlokasiPagu = async (unit, subunit, ADO, year) => {
  const queryPagu = await PaguModel.findOne({unit: unit, subunit: subunit, ADO: ADO, year: year});
  if (!queryPagu) {
    throw {name: "paguNotFound", message: `Alokasi Pagu anggaran ${ADO} untuk ${unit} tahun ${year} tidak ditemukan`};
  }
  return queryPagu.alokasi;

}

export const getPenggunaanPagu = async (unit, subunit, ADO, year) => {
  const queryPagu = await PaguModel.findOne({unit: unit, subunit: subunit, ADO: ADO, year: year});
  if (!queryPagu) {
    throw {
      name: "paguNotFound",
      message: `Penggunaan Pagu anggaran ${ADO} untuk ${unit} tahun ${year} tidak ditemukan`
    };
  }
  return queryPagu.penggunaan;

}

export const getSisaPagu = async (unit, subunit, ADO, year) => {
  const queryPagu = await PaguModel.findOne({unit: unit, subunit: subunit, ADO: ADO, year: year});
  if (!queryPagu) {
    throw {name: "paguNotFound", message: `Sisa Pagu anggaran ${ADO} untuk ${unit} tahun ${year} tidak ditemukan`};
  }
  return queryPagu.alokasi - queryPagu.penggunaan;
}

