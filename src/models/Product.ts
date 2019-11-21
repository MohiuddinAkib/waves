import mongoose from "mongoose";
import Brand, { BrandDocument } from "./Brand";
import Wood, { WoodDocument } from "./Wood";

export interface ProductDocument extends mongoose.Document {
  name: string;
  description: string;
  price: number;
  brand: BrandDocument;
  shipping: boolean;
  available: boolean;
  wood: WoodDocument;
  frets: number;
  sold: number;
  publish: boolean;
  images: string[];
}

interface ProductModel extends mongoose.Model<ProductDocument> {}

const ProductSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
      unique: true,
      maxlength: 100
    },
    description: {
      type: String,
      required: true,
      maxlength: 1500
    },
    price: {
      type: Number,
      required: true,
      maxlength: 255
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Brand,
      required: true
    },
    shipping: {
      required: true,
      type: Boolean
    },
    available: {
      required: true,
      type: Boolean
    },
    wood: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Wood,
      required: true
    },
    frets: {
      type: Number,
      required: true
    },
    sold: {
      type: Number,
      maxlength: 255,
      default: 0
    },
    publish: {
      required: true,
      type: Boolean
    },
    images: {
      type: Array,
      default: []
    }
  },
  {
    timestamps: true
  }
);

const Product = mongoose.model<ProductDocument, ProductModel>(
  "Product",
  ProductSchema
);

export default Product;
