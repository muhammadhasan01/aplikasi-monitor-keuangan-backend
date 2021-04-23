import mongoose from 'mongoose';

const unitsSchema = mongoose.Schema({
    unit: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    code: {
        type: Number,
        unique: true
    },
    subunit: {
        type: String,
        required: true,
        trim: true,
    }
});

const UnitsModel = mongoose.model('units', unitsSchema);

export const getUnits = async () => {
    try {
        const units = await UnitsModel.find();
        return units;
    } catch (err) {
        throw err;
    }
}

export const getDistinctUnits = async () => {
    try {
        const units = await UnitsModel.distinct("unit");
        return units;
    } catch (err) {
        throw err;
    }
}

export const getSubUnits = async () => {
    try {
        const subUnits = await UnitsModel.distinct("subunit");
        return subUnits;
    } catch (err) {
        throw err;
    }
}

export const getSubUnitsForUnits = async(unit) => {
    try{
        const subunits = await UnitsModel.distinct("subunit", { unit: unit })
        return subunits;
    }
    catch(err){
        throw err;
    }
}

export const createUnit = async ({ unit, code, subunit }) => {
    const newUnit = new UnitsModel({ unit, code, subunit });
    try {
        const unitCreated = await newUnit.save();
        return unitCreated;
    } catch (err) {
        throw err;
    }
}

export const isUnitExist = async(unit, code, subunit) => {
    try{
        console.log("Masuk model");
        const queryUnit = await UnitsModel.findOne({unit: unit, code: code, subunit: subunit});
        console.log(queryUnit);
        if (!queryUnit) {
            return false;
        }
        return true;
    } catch (err) {
        throw err;
    }
}

export const getUnit = async (name) => {
    try {
        const unit = await UnitsModel.find({unit: name});
        if (!unit) {
            throw {name: "unitNotFound", message: `unit with ${id} was not found`};
        }
        return unit;
    } catch (err) {
        throw err;
    }
}

export const updateUnit = async (id, data) => {
    try {
        const updatedUnit = await UnitsModel.findByIdAndUpdate(id, data, {new: true});
        if (!updatedUnit) {
            throw {name: "unitNotFound", message: `unit with ${id} was not found`};
        }
        return updatedUnit;
    } catch (err) {
        throw err;
    }
}

export const deleteUnit = async (id) => {
    try {
        const deletedUnit = await UnitsModel.findByIdAndRemove(id);
        return deletedUnit;
    } catch (err) {
        throw err;
    }
}