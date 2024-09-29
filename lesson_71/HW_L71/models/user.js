import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    max: 254,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  refreshToken: {
    type: String,
    default: ''
  }
});

export const User = mongoose.model('User', userSchema);