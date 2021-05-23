import mongoose from 'mongoose';

const subKegiatanSchema = mongoose.Schema({
  nama: {
    type: String,
    required: true,
  }
});

const subKegiatan = mongoose.model('subkegiatan', subKegiatanSchema);

export default subKegiatan;