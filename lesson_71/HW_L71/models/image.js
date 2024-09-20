import mongoose from "mongoose";

const Schema = mongoose.Schema;

const imageSchema = new Schema({
  name: {
    type: String,
    max: 50
  }
});

export const Image = mongoose.model('Image', imageSchema);