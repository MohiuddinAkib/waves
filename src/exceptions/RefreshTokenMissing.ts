import httpStatusCodes from "http-status-codes";
import * as messages from "@/constants/messages";

export default class RefreshTokenMissing extends Error {
  constructor(
    message = messages.REFRESH_TOKEN_MISSING,
    public status = httpStatusCodes.BAD_REQUEST
  ) {
    super(message);
  }
}
