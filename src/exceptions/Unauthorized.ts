import httpStatusCodes from "http-status-codes";
import * as messages from "@/constants/messages";

export default class Unauthorized extends Error {
  constructor(
    message = messages.USER_UNAUTHORIZED,
    public status = httpStatusCodes.UNAUTHORIZED
  ) {
    super(message);
  }
}
