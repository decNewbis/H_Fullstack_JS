import mongoose from "mongoose";

const Schema = mongoose.Schema;

const videoSchema = new Schema({
  name: {
    type: String,
    max: 50
  }
});

export const Video = mongoose.model('Video', videoSchema);