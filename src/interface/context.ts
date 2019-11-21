import Koa from "koa";
import { UserDocument } from "@/models/User";

type MyContext = Koa.ParameterizedContext<
  { user: UserDocument & { _doc: any } },
  {
    ok(payload: any): Koa.Context;
    notFound(payload: any): Koa.Context;
    badRequest(payload: any): Koa.Context;
    send(status: number, payload: any): Koa.Context;
    created(payload: any): Koa.Context;
    noContent(payload: any): Koa.Context;
    unauthorized(payload: any): Koa.Context;
    forbidden(payload: any): Koa.Context;
    locked(payload: any): Koa.Context;
    internalServerError(payload: any): Koa.Context;
    notImplemented(payload: any): Koa.Context;
  }
>;

export default MyContext;
