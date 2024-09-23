import mongoose from "mongoose";

const Schema = mongoose.Schema;

const cartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  products: [{
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Product'
  }]
});

export const Cart = mongoose.model('Cart', cartSchema);