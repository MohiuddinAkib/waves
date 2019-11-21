import Wood from "@/models/Wood";
import { IWoodStoreData } from "@/interface/IWoodStoreData";

export const storeWood = async (woodStoreData: IWoodStoreData) => {
  const wood = new Wood(woodStoreData);

  await wood.save();

  return wood;
};

export const getAllWoods = async () => {
  const woods = await Wood.find({}).exec();

  return woods;
};
