import Koa from "koa";
import config from "config";
import passport from "koa-passport";
import passportJwt from "passport-jwt";
import * as cookieConstants from "@/constants/cookie";
import * as UserService from "@/services/UserService";
import Unauthenticated from "@/exceptions/Unauthenticated";

const JwtStrategy = passportJwt.Strategy,
  ExtractJwt = passportJwt.ExtractJwt;

var opts: passportJwt.StrategyOptions = {} as passportJwt.StrategyOptions;

opts.jwtFromRequest = ExtractJwt.fromExtractors([
  function(ctx: Koa.Context) {
    return ctx.cookies.get(cookieConstants.Types.accessToken);
  } as any
]);
opts.secretOrKey = config.get("app.jwt-secret-key");

export default () => {
  passport.use(
    new JwtStrategy(opts, async function(userId: string, done) {
      const user = await UserService.findUserById(userId);

      if (!user) {
        return done(new Unauthenticated(), false);
      }

      return done(null, user);
    })
  );
};
