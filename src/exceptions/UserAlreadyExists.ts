import httpStatusCodes from "http-status-codes";
import * as messages from "@/constants/messages";

export default class UserAlreadyExists extends Error {
  constructor(
    message = messages.USER_ALREADY_EXISTS,
    public status = httpStatusCodes.BAD_REQUEST
  ) {
    super(message);
  }
}
