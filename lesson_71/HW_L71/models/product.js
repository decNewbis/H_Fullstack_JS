import mongoose from  'mongoose';

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
  videos: {
    type: Array,
    default: [],
    items: {
      type: mongoose.Schema.Types.ObjectId,
    },
    max: 5
  },
  images: {
    type: Array,
    default: [],
    items: {
      type: mongoose.Schema.Types.ObjectId,
    },
    max: 10
  },
  previews: {
    type: Array,
    default: [],
    items: {
      type: mongoose.Schema.Types.ObjectId,
    },
    max: 10
  }
});

productSchema.path('videos').validate((videosList) => {
  return videosList.length <= 5;
}, 'Maximum 5 videos');
productSchema.path('images').validate((imagesList) => {
  return imagesList.length <= 10;
}, 'Maximum 10 images');
productSchema.path('previews').validate((previewsList) => {
  return previewsList.length <= 10;
}, 'Maximum 10 previews');

export const Product = mongoose.model('Product', productSchema);