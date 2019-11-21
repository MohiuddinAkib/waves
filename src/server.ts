import "dotenv/config";
import "reflect-metadata";
import "./utils/moduleAlias";

import Koa from "koa";
import chalk from "chalk";
import config from "config";
import json from "koa-json";
import mount from "koa-mount";
import mongoose from "mongoose";
import compose from "koa-compose";
import respond from "koa-respond";
import passport from "koa-passport";
import bodyParser from "koa-bodyparser";
import koa404Handler from "koa-404-handler";
import httpStatusCodes from "http-status-codes";
import errorHandler from "koa-better-error-handler";

// Custom imports
import apiRoutes from "@/routes";
import * as debug from "@/utils/debug";
import * as messages from "@/constants/messages";
import usePassportJwt from "@/middlewares/usePassportJwt";

// Init app
const app: Koa = new Koa();
// override koa's undocumented error handler
app.context.onerror = errorHandler;
// specify that this is our api
app.context.api = true;
// Init mongoose
mongoose.Promise = global.Promise;
mongoose.connect(config.get("db.mongo.uri"), {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
});
// Mongoose status
mongoose.connection
  .on("open", () => debug.mongoDebug(messages.MONGO_CONNECTED))
  .once("error", error => debug.mongoDebug(chalk.red(error)));

process
  .on("unhandledRejection", error => app.emit("error", error, app.context))
  .on("uncaughtException", error => app.emit("error", error, app.context));

app.on("error", (error, ctx: Koa.Context) => {
  const statusCode = ctx.status || httpStatusCodes.INTERNAL_SERVER_ERROR;

  if (ctx.app.env === "development") {
    if (error instanceof mongoose.Error) {
      ctx.send(statusCode, {
        statusCode: (error as any).statusCode,
        error: (error as any).errors,
        message: (error as any)._message
      });
      return;
    }

    ctx.send(statusCode, {
      statusCode,
      error: httpStatusCodes.getStatusText(statusCode),
      message: error.message
    });
  } else {
    ctx.internalServerError(messages.INTERNAL_SERVER_ERROR);
  }
});

// Middleware
app.use(
  compose([
    koa404Handler,
    json(),
    respond(),
    bodyParser(),
    passport.initialize()
  ])
);

// Init passport jwt
usePassportJwt();

// Routes middleware
app.use(mount("/api/v1", apiRoutes()));

// Listen for request on specified port
const server = app.listen(config.get("app.port"));

// Server status observing
server
  .on("listening", () => debug.serverDebug(messages.SERVER_LISTENING))
  .on("error", error => debug.serverDebug(chalk.red(error)));
