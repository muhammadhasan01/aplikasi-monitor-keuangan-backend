import mongoose from 'mongoose';

const belanjaSchema = mongoose.Schema({
  jenis: {
    type: String,
    required: true,
    unique: true,
  },
  rincian: {
    type: String,
    required: true
  }
});

const belanja = mongoose.model('belanja', belanjaSchema);

export default belanja;