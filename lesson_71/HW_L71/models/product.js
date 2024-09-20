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