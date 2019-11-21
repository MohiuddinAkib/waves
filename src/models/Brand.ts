import mongoose from "mongoose";

export interface BrandDocument extends mongoose.Document {
  name: string;
}

interface BrandModel extends mongoose.Model<BrandDocument> {}

const BrandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 100,
      unique: true
    }
  },
  {
    timestamps: true
  }
);

const Brand = mongoose.model<BrandDocument, BrandModel>("Brand", BrandSchema);

export default Brand;
