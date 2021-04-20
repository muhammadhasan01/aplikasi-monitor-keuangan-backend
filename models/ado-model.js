import mongoose from 'mongoose';

const adosSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    detail: {
        type: String
    }
});

const ADO = mongoose.model('ados', adosSchema);

export const getDistinctADOs = async () => {
    try {
        const ADOs = await ADO.distinct("name");
        return ADOs;
    } catch (err) {
        throw err;
    }
}

export const createADO = async ({ name, detail }) => {
    const newADO = new ADO({ name, detail });
    try {
        const ADOCreated = await newADO.save();
        return ADOCreated;
    } catch (err) {
        throw err;
    }
}