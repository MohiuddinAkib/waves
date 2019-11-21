import Product from "@/models/Product";
import { IProductStoreData } from "@/interface/IProductStoreData";
import mongoose from "mongoose";

export const storeProduct = async (productStoreData: IProductStoreData) => {
  const product = new Product(productStoreData);

  await product.save();

  return product;
};

export const getProductsById = async (idArray: mongoose.Types.ObjectId[]) => {
  const products = await Product.find({ _id: { $in: idArray } })
    .populate("brand wood")
    .exec();
  return products;
};

export const getProducts = async (
  limit: number,
  order: string,
  sortBy: string
) => {
  const products = await Product.find({})
    .populate("brand wood")
    .sort([[sortBy, order]])
    .limit(limit)
    .exec();
  return products;
};
