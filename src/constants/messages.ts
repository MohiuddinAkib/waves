import chalk from "chalk";
import config from "config";
import httpStatusCodes from "http-status-codes";

export const SERVER_LISTENING = chalk.greenBright(
  `Server listening on port ${config.get("app.port")}`
);

export const MONGO_CONNECTED = chalk.greenBright(
  "Mongo db connection established"
);

export const INTERNAL_SERVER_ERROR = {
  statusCode: httpStatusCodes.INTERNAL_SERVER_ERROR,
  error: httpStatusCodes.getStatusText(httpStatusCodes.INTERNAL_SERVER_ERROR),
  message: "Something went wrong. Please try again later"
};

export const USER_REGISTERED = {
  statusCode: httpStatusCodes.CREATED,
  success: httpStatusCodes.getStatusText(httpStatusCodes.CREATED),
  message: "User registered successfully"
};

export const USER_ALREADY_EXISTS = "User already exists";
export const LOGIN_FAILED = "Couldn't log in with the provided credentials";
export const LOGIN_SUCCESS = {
  statusCode: httpStatusCodes.OK,
  success: httpStatusCodes.getStatusText(httpStatusCodes.OK),
  message: "Successfully logged in"
};
export const USER_UNAUTHENTICATED = "User is not authenticated";
export const TOKEN_REFRESHED = "token refreshed successfully";
export const REFRESH_TOKEN_MISSING = "No refresh token";
export const REFRESH_TOKEN_VERSION_MISMATCH = "Token version mismatched";
export const USER_LOGGED_OUT = {
  statusCode: httpStatusCodes.OK,
  success: httpStatusCodes.getStatusText(httpStatusCodes.OK),
  message: "Logged out successfully"
};
export const USER_UNAUTHORIZED = "You are not allowed";

// Brand
export const BRAND_CREATED = {
  statusCode: httpStatusCodes.CREATED,
  success: httpStatusCodes.getStatusText(httpStatusCodes.CREATED),
  message: "Brand created successfully"
};

// Wood
export const WOOD_CREATED = {
  statusCode: httpStatusCodes.CREATED,
  success: httpStatusCodes.getStatusText(httpStatusCodes.CREATED),
  message: "Wood created successfully"
};

// Product
export const PRODUCT_CREATED = {
  statusCode: httpStatusCodes.CREATED,
  success: httpStatusCodes.getStatusText(httpStatusCodes.CREATED),
  message: "Product created successfully"
};
