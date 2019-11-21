import Koa from "koa";
import Router from "koa-router";
import passport from "koa-passport";
import RoutePrefix from "@/interface/RoutePrefix";
import UserRouteUrls from "@/interface/UserRouteUrls";
import * as UserController from "@/controllers/UserController";

const router = new Router({
  prefix: RoutePrefix.userRoute
});

router.post(
  UserRouteUrls.registerRouteName,
  UserRouteUrls.registerUrl,
  UserController.registerUser as Koa.Middleware
);

router.post(
  UserRouteUrls.loginRouteName,
  UserRouteUrls.loginUrl,
  UserController.loginUser as Koa.Middleware
);

router.post(
  UserRouteUrls.registerRouteName,
  UserRouteUrls.registerUrl,
  UserController.refreshToken as Koa.Middleware
);

router.post(
  UserRouteUrls.revokeRefreshTokenRouteName,
  UserRouteUrls.revokeRefreshTokenUrl,
  UserController.revokeRefreshToken as Koa.Middleware
);

router.get(
  UserRouteUrls.authRouteName,
  UserRouteUrls.authUrl,
  passport.authenticate("jwt", { session: false }),
  UserController.auth as Koa.Middleware
);

router.get(
  UserRouteUrls.logoutRouteName,
  UserRouteUrls.logoutUrl,
  passport.authenticate("jwt", { session: false }),
  UserController.logout as Koa.Middleware
);

export default router;
