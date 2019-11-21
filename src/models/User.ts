import config from "config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import UserRoles from "@/interface/UserRoles";
import * as constants from "@/constants/bcrypt";

type comparePassword = (password: string) => Promise<boolean>;

export type UserDocument = mongoose.Document & {
  email: string;
  password: string;
  name: string;
  lastName: string;
  cart: any[];
  history: any[];
  role: number;
  tokenVersion: number;

  comparePassword: comparePassword;

  generateAccessToken: () => string;
  generateRefreshToken: () => string;
};

type UserModel = mongoose.Model<UserDocument> & {
  verifyToken: (token: string) => string | object;
};

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      maxlength: 255
    },
    password: {
      type: String,
      required: true,
      maxlength: 255,
      minlength: 6
    },
    name: {
      type: String,
      required: true,
      maxlength: 255,
      minlength: 6
    },
    lastName: {
      type: String,
      required: true,
      maxlength: 255,
      minlength: 6
    },
    cart: {
      type: Array,
      default: []
    },
    history: {
      type: Array,
      default: []
    },
    role: {
      type: Number,
      default: UserRoles.nonadmin
    },
    tokenVersion: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

UserSchema.pre("save", async function(next) {
  try {
    const user = this as UserDocument;

    if (user.isModified("password")) {
      const salt = await bcrypt.genSalt(constants.SALT_I);

      const hash = await bcrypt.hash(user.password, salt);

      user.password = hash;
    }

    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.comparePassword = async function(password: string) {
  try {
    const user = this as UserDocument;

    const isMatch = await bcrypt.compare(password, user.password);

    return isMatch;
  } catch (error) {
    Promise.reject(error);
  }
};

UserSchema.methods.generateAccessToken = function() {
  const user = this as UserDocument;

  const accessToken = jwt.sign(user.id, config.get("app.jwt-secret-key"), {
    // expiresIn: 60,
  });

  return accessToken;
};

UserSchema.methods.generateRefreshToken = function() {
  const user = this as UserDocument;

  const refreshToken = jwt.sign(
    { userId: user.id, tokenVersion: user.tokenVersion },
    config.get("app.jwt-secret-key"),
    {
      // expiresIn: 60
    }
  );

  return refreshToken;
};

UserSchema.statics.verifyToken = function(token: string) {
  return jwt.verify(token, config.get("app.jwt-secret-key"));
};

const User = mongoose.model<UserDocument, UserModel>("User", UserSchema);

export default User;
