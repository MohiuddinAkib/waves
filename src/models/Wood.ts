import mongoose from "mongoose";

export interface WoodDocument extends mongoose.Document {
  name: string;
}

interface WoodModel extends mongoose.Model<WoodDocument> {}

const WoodSchema = new mongoose.Schema(
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

const Wood = mongoose.model<WoodDocument, WoodModel>("Wood", WoodSchema);

export default Wood;
