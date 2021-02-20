import mongoose from 'mongoose';

const unitsSchema = mongoose.Schema({
    nama: {
        type: String,
        required: true,
        unique: true
    }
});

const Units = mongoose.model('units', unitsSchema);

export default Units;