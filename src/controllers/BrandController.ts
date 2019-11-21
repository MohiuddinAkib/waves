import Koa from "koa";
import MyContext from "@/interface/context";
import * as messages from "@/constants/messages";
import * as BrandService from "@/services/BrandService";
import { IBrandStoreData } from "@/interface/IBrandStoreData";
import httpStatusCode from "http-status-codes";

export const storeBrand = async (ctx: MyContext, next: Koa.Next) => {
  const brandData = ctx.request.body as IBrandStoreData;
  const brand = await BrandService.storeBrand(brandData);
  ctx.created({
    ...messages.BRAND_CREATED,
    brand
  });
};

export const getAllBrands = async (ctx: MyContext, next: Koa.Next) => {
  const brands = await BrandService.getAllBrands();
  ctx.ok({
    statusCode: httpStatusCode.OK,
    success: httpStatusCode.getStatusText(httpStatusCode.OK),
    message: httpStatusCode.getStatusText(httpStatusCode.OK),
    brands
  });
};
