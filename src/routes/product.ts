import Koa from "koa";
import Router from "koa-router";
import passport from "koa-passport";
import useAdmin from "@/middlewares/useAdmin";
import RoutePrefix from "@/interface/RoutePrefix";
import ProductRouteUrls from "@/interface/ProductRouteUrls";
import * as ProductController from "@/controllers/ProductController";

const router = new Router({
  prefix: RoutePrefix.productRoute
});

router.get(
  ProductRouteUrls.getProductsRouteName,
  ProductRouteUrls.getProductsUrl,
  ProductController.getProducts as Koa.Middleware
);

// Products by id
router.get(
  ProductRouteUrls.getProductByIdRouteName,
  ProductRouteUrls.getProductByIdUrl,
  ProductController.getProductsById as Koa.Middleware
);

router.post(
  ProductRouteUrls.storeProductRouteName,
  ProductRouteUrls.storeProductUrl,
  passport.authenticate("jwt", { session: false }),
  useAdmin as Koa.Middleware,
  ProductController.storeProduct as Koa.Middleware
);

export default router;
