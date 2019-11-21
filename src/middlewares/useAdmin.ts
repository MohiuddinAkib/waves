import Koa from "koa";
import MyContext from "@/interface/context";
import UserRoles from "@/interface/UserRoles";
import Unauthorized from "@/exceptions/Unauthorized";

export default async (ctx: MyContext, next: Koa.Next) => {
  if (ctx.state.user.role === UserRoles.nonadmin) {
    ctx.throw(new Unauthorized());
  }

  await next();
};
