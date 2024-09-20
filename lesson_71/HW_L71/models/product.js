import mongoose from  'mongoose';
import {ErrorForbidden} from "../errorHandler.js";

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
  if (update.$push && update.$push.videos && product.videos.length >= 5) {
    throw new ErrorForbidden('Cannot add more than 5 videos.');
  }
  if (update.$push && update.$push.images && product.images.length >= 10) {
    throw new ErrorForbidden('Cannot add more than 10 images.');
  }
  if (update.$push && update.$push.previews && product.previews.length >= 10) {
    throw new ErrorForbidden('Cannot add more than 10 previews.');
  }
});

export const Product = mongoose.model('Product', productSchema);