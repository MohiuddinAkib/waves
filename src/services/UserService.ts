import User, { UserDocument } from "@/models/User";
import LoginFailed from "@/exceptions/LoginFailed";
import BadRequest from "@/exceptions/BadRequest";
import UserAlreadyExists from "@/exceptions/UserAlreadyExists";
import { IUserRegisterData, IUserLoginData } from "@/interface/user";

type checkUserAlreadyRegistered<T> = T extends true
  ? UserDocument | null
  : boolean;

export const registerUser = async (userData: IUserRegisterData) => {
  const userAlreadyExists = await checkUserAlreadyRegistered(userData.email);

  if (userAlreadyExists) {
    throw new UserAlreadyExists();
  }

  const user = new User(userData);

  await user.save();
};

export const loginUser = async (loginUserData: IUserLoginData) => {
  const user = await checkUserAlreadyRegistered(loginUserData.email, true);

  if (!user) {
    throw new LoginFailed();
  }

  const isMatch = await user.comparePassword(loginUserData.password);

  if (!isMatch) {
    throw new LoginFailed();
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  return { accessToken, refreshToken, user };
};

const checkUserAlreadyRegistered = async <T extends boolean>(
  email: string,
  returnUserData: T = false as T
): Promise<checkUserAlreadyRegistered<T>> => {
  const foundUser = await User.findOne({ email }).exec();

  return (returnUserData
    ? foundUser
    : foundUser
    ? true
    : false) as checkUserAlreadyRegistered<T>;
};

export const findUserById = async (userId: string) => {
  return User.findById(userId)
    .select("-password -_id -tokenVersion")
    .exec();
};

export const verifyToken = (token: string) => {
  return User.verifyToken(token);
};

export const changeUserRefreshTokenVersion = async (userId: string) => {
  const user = await User.findById(userId).exec();

  if (!user) {
    throw new BadRequest();
  }

  user.tokenVersion++;

  await user.save();
};
