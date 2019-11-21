import Koa from "koa";
import Router from "koa-router";
import passport from "passport";
import WoodRouterUrls from "@/interface/WoodRouterUrls";
import * as WoodController from "@/controllers/WoodController";
import useAdmin from "@/middlewares/useAdmin";
import RoutePrefix from "@/interface/RoutePrefix";

const router = new Router({
  prefix: RoutePrefix.woodRoute
});

router.get(
  WoodRouterUrls.getAllWoodsRouteName,
  WoodRouterUrls.getAllWoodsUrl,
  WoodController.getAllWoods as Koa.Middleware
);

router.post(
  WoodRouterUrls.storeWoodRouteName,
  WoodRouterUrls.storeWoodUrl,
  passport.authenticate("jwt", { session: false }),
  useAdmin as Koa.Middleware,
  WoodController.storeWood as Koa.Middleware
);

export default router;
