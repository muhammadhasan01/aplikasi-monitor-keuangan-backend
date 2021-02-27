import mongoose from 'mongoose';

const adosSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

const Units = mongoose.model('ados', adosSchema);

export default Units;