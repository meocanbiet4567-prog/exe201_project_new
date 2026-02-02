import mongoose from 'mongoose';

// const productSchema = new mongoose.Schema({
//   name: String,
//   price: Number,
//   images: {
//     type: [String],
//     required: true
//   },
//   seeds: [String],
//   rating: Number
// }, { timestamps: true });


const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    seeds: { type: [String], required: true },
    inStock: { type: Boolean, default: true },
    images: { type: [String], required: true },
    description: String,
    features: { type: [String], default: [] },
    specifications: { type: Object, default: {} },
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);
