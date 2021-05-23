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
  const units = await UnitsModel.find();
  return units;
}

export const getDistinctUnits = async () => {
  const units = await UnitsModel.distinct("unit");
  return units;
}

export const getSubUnits = async () => {
  const subUnits = await UnitsModel.distinct("subunit");
  return subUnits;
}

export const getSubUnitsForUnits = async (unit) => {
  const subunits = await UnitsModel.distinct("subunit", {unit: unit})
  return subunits;
}

export const createUnit = async ({unit, code, subunit}) => {
  const newUnit = new UnitsModel({unit, code, subunit});
  const unitCreated = await newUnit.save();
  return unitCreated;
}

export const isUnitExist = async (unit, code, subunit) => {
  const queryUnit = await UnitsModel.findOne({unit: unit, code: code, subunit: subunit});
  if (!queryUnit) {
    return false;
  }
  return true;
}

export const getUnit = async (name) => {
  const unit = await UnitsModel.find({unit: name});
  if (!unit) {
    throw {name: "unitNotFound", message: `unit with ${id} was not found`};
  }
  return unit;
}

export const updateUnit = async (id, data) => {
  const updatedUnit = await UnitsModel.findByIdAndUpdate(id, data, {new: true});
  if (!updatedUnit) {
    throw {name: "unitNotFound", message: `unit with ${id} was not found`};
  }
  return updatedUnit;
}

export const deleteUnit = async (id) => {
  const deletedUnit = await UnitsModel.findByIdAndRemove(id);
  return deletedUnit;
}