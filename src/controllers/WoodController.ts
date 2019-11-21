import Koa from "koa";
import MyContext from "@/interface/context";
import httpStatusCode from "http-status-codes";
import * as messages from "@/constants/messages";
import * as WoodService from "@/services/WoodService";
import { IWoodStoreData } from "@/interface/IWoodStoreData";

export const storeWood = async (ctx: MyContext, next: Koa.Next) => {
  const woodData = ctx.request.body as IWoodStoreData;

  const wood = await WoodService.storeWood(woodData);

  ctx.created({
    ...messages.WOOD_CREATED,
    wood
  });
};

export const getAllWoods = async (ctx: MyContext, next: Koa.Next) => {
  const woods = await WoodService.getAllWoods();

  ctx.ok({
    statusCode: httpStatusCode.OK,
    success: httpStatusCode.getStatusText(httpStatusCode.OK),
    message: httpStatusCode.getStatusText(httpStatusCode.OK),
    woods
  });
};
