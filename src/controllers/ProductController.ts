import Koa from "koa";
import mongoose from "mongoose";
import MyContext from "@/interface/context";
import httpStatusCode from "http-status-codes";
import * as messages from "@/constants/messages";
import { ProductDocument } from "@/models/Product";
import * as ProductService from "@/services/ProductService";
import { IProductStoreData } from "@/interface/IProductStoreData";

export const storeProduct = async (ctx: MyContext, next: Koa.Next) => {
  const productData = ctx.request.body as IProductStoreData;

  const product = await ProductService.storeProduct(productData);

  ctx.created({
    ...messages.PRODUCT_CREATED,
    product
  });
};

export const getProductsById = async (ctx: MyContext, next: Koa.Next) => {
  const type = ctx.request.query.type,
    idString: string = ctx.request.query.id;

  let products: ProductDocument[] = [];

  if (type === "array") {
    const ids = idString
      .split(",")
      .map((id: string) => mongoose.Types.ObjectId(id));

    products = await ProductService.getProductsById(ids);
  }

  ctx.ok({
    statusCode: httpStatusCode.OK,
    success: httpStatusCode.getStatusText(httpStatusCode.OK),
    message: httpStatusCode.getStatusText(httpStatusCode.OK),
    products
  });
};

export const getProducts = async (ctx: MyContext, next: Koa.Next) => {
  const limit = parseInt(ctx.request.query.limit) || 100,
    order = ctx.request.query.order || "asc",
    sortBy = ctx.request.query.sortBy || "_id";

  const products = await ProductService.getProducts(limit, order, sortBy);

  ctx.ok({
    statusCode: httpStatusCode.OK,
    success: httpStatusCode.getStatusText(httpStatusCode.OK),
    message: httpStatusCode.getStatusText(httpStatusCode.OK),
    products
  });
};
