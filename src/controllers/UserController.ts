import Koa from "koa";
import MyContext from "@/interface/context";
import UserRoles from "@/interface/UserRoles";
import httpStatusCodes from "http-status-codes";
import * as messages from "@/constants/messages";
import BadRequest from "@/exceptions/BadRequest";
import * as cookieConstants from "@/constants/cookie";
import UserRouteUrls from "@/interface/UserRouteUrls";
import * as UserServices from "@/services/UserService";
import RefreshTokenMissing from "@/exceptions/RefreshTokenMissing";
import { IUserRegisterData, IUserLoginData } from "@/interface/user";
import { IJwtRefreshTokenPayload } from "@/interface/jwt-refresh-token-payload";

const sendAccessToken = (ctx: MyContext, accessToken: string) => {
  ctx.cookies.set(cookieConstants.Types.accessToken, accessToken, {
    httpOnly: true
  });
};

const sendRefreshToken = (ctx: MyContext, refreshToken: string) => {
  ctx.cookies.set(cookieConstants.Types.refreshToken, refreshToken, {
    httpOnly: true,
    path: UserRouteUrls.refreshTokenUrl
  });
};

export const registerUser = async (ctx: MyContext, next: Koa.Next) => {
  const data = ctx.request.body as IUserRegisterData;

  const user = await UserServices.registerUser(data);

  ctx.created({ ...messages.USER_REGISTERED, user });
};

export const loginUser = async (ctx: MyContext, next: Koa.Next) => {
  const data = ctx.request.body as IUserLoginData;

  const loginResult = await UserServices.loginUser(data);

  sendAccessToken(ctx, loginResult.accessToken);
  sendRefreshToken(ctx, loginResult.refreshToken);

  ctx.send(httpStatusCodes.OK, messages.LOGIN_SUCCESS);
};

export const refreshToken = async (ctx: MyContext, next: Koa.Next) => {
  const token = ctx.cookies.get(cookieConstants.Types.refreshToken);

  if (!token) {
    throw new RefreshTokenMissing();
  }

  const payload = UserServices.verifyToken(token) as IJwtRefreshTokenPayload;

  const user = await UserServices.findUserById(payload.userId);

  if (!user) {
    throw new BadRequest();
  }

  if (user.tokenVersion !== payload.tokenVersion) {
    throw new BadRequest(messages.REFRESH_TOKEN_VERSION_MISMATCH);
  }

  const accessToken = user.generateAccessToken(),
    refreshToken = user.generateRefreshToken();

  sendAccessToken(ctx, accessToken);
  sendRefreshToken(ctx, refreshToken);

  ctx.ok({
    statusCode: httpStatusCodes.OK,
    success: httpStatusCodes.getStatusText(httpStatusCodes.OK),
    message: messages.TOKEN_REFRESHED
  });
};

export const revokeRefreshToken = (ctx: MyContext, next: Koa.Next) => {
  const userId: string = ctx.request.body.userId;

  UserServices.changeUserRefreshTokenVersion(userId);
};

export const auth = (ctx: MyContext, next: Koa.Next) => {
  const user = ctx.state.user;

  ctx.ok({
    isAdmin: user.role === UserRoles.admin,
    isAuth: true,
    ...user._doc
  });
};

export const logout = (ctx: MyContext, next: Koa.Next) => {
  ctx.cookies.set(cookieConstants.Types.accessToken);
  ctx.ok(messages.USER_LOGGED_OUT);
};
