import mongoose from  'mongoose';
import {validateFileCount} from "../utils/file.utils.js";

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    max: 50
  },
  description: {
    type: String,
    required: true,
    max: 256
  },
  price: {
    type: Number,
    required: true
  },
  videos: [{
    type: Schema.Types.ObjectId,
    ref: 'Video'
  }],
  images: [{
    type: Schema.Types.ObjectId,
    ref: 'Image'
  }],
  previews: [{
    type: Schema.Types.ObjectId,
    ref: 'Preview'
  }]
});

productSchema.pre('findOneAndUpdate', async function () {
  const update = this.getUpdate();
  const product = await this.model.findOne(this.getQuery());
  if (update.$push.videos) {
    validateFileCount(product, 'videos');
  }
  if (update.$push.images) {
    validateFileCount(product, 'images');
  }
  if (update.$push.previews) {
    validateFileCount(product, 'previews');
  }
});

export const Product = mongoose.model('Product', productSchema);