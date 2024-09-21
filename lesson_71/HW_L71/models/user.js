import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    max: 254,
    validate: {
      validator: async function(email) {
        const user = await this.constructor.findOne({ email });
        return !user;
      },
      message: "user already exists"
    }
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