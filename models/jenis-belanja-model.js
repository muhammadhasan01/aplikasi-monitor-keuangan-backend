import mongoose from 'mongoose';

const rincianBelanjaSchema = mongoose.Schema({
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

const rincianBelanja = mongoose.model('belanja', rincianBelanjaSchema);

export default rincianBelanja;