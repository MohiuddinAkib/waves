import { BrandDocument } from "@/models/Brand";
import { WoodDocument } from "@/models/Wood";

export interface IProductStoreData {
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
