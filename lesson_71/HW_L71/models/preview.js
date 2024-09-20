import mongoose from "mongoose";

const Schema = mongoose.Schema;

const previewSchema = new Schema({
  name: {
    type: String,
    max: 50
  }
});

export const Preview = mongoose.model('Preview', previewSchema);