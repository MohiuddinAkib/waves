import * as messages from "@/constants/messages";

export default class Unauthenticated extends Error {
  constructor(message = messages.USER_UNAUTHENTICATED, public status = 403) {
    super(message);
  }
}
