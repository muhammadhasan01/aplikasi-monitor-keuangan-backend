import mongoose from 'mongoose';

const jenisBelanjaSchema = mongoose.Schema({
  nama: {
    type: String,
    required: true,
    unique: true,
  }
});

const rincianBelanja = mongoose.model('belanja', jenisBelanjaSchema);

export default rincianBelanja;