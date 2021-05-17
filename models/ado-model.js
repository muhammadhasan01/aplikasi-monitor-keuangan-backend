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
    return await ADO.distinct("name");
}

export const createADO = async ({name, detail}) => {
  const newADO = new ADO({name, detail});
  const ADOCreated = await newADO.save();
  return ADOCreated;
}

export const deleteADO = async (id) => {
  return await ADO.findByIdAndRemove(id);
}