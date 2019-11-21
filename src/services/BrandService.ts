import Brand from "@/models/Brand";
import { IBrandStoreData } from "@/interface/IBrandStoreData";

export const storeBrand = async (brandStoreData: IBrandStoreData) => {
  const brand = new Brand(brandStoreData);
  await brand.save();
  return brand;
};

export const getAllBrands = async () => {
  const brands = await Brand.find({}).exec();
  return brands;
};
