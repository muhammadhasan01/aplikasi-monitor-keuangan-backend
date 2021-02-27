import mongoose from 'mongoose';

const unitsSchema = mongoose.Schema({
    name: {
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

export const getSubUnits = async () => {
    try {
        const subUnits = await UnitsModel.distinct("subunit");
        return subUnits;
    } catch (err) {
        throw err;
    }
}

export const createUnit = async ({ name, code, subunit }) => {
    const newUnit = new UnitsModel({ name, code, subunit });
    try {
        const unitCreated = await newUnit.save();
        return unitCreated;
    } catch (err) {
        throw err;
    }
}

export const getUnit = async (id) => {
    try {
        const unit = await UnitsModel.findById(id);
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