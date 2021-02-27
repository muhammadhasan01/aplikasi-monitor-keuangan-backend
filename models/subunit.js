import mongoose from 'mongoose';

const subUnitsSchema = mongoose.Schema({
    nama: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
});

const subUnits = mongoose.model('subUnits', subUnitsSchema);

export default subUnits;