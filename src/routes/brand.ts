import Koa from "koa";
import Router from "koa-router";
import passport from "koa-passport";
import BrandRouteUrls from "@/interface/BrandRouteUrls";
import * as BrandController from "@/controllers/BrandController";
import useAdmin from "@/middlewares/useAdmin";
import RoutePrefix from "@/interface/RoutePrefix";

const router = new Router({
  prefix: RoutePrefix.brandRoute
});

router.get(
  BrandRouteUrls.getAllBrandsRouteName,
  BrandRouteUrls.getAllBrandsUrl,
  BrandController.getAllBrands as Koa.Middleware
);

router.post(
  BrandRouteUrls.brandRouteName,
  BrandRouteUrls.brandUrl,
  passport.authenticate("jwt", { session: false }),
  useAdmin as Koa.Middleware,
  BrandController.storeBrand as Koa.Middleware
);

export default router;
