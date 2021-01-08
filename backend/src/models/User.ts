import { Document, Schema, Model, model } from "mongoose";
import { Profile } from "./Profile";

export interface IUser {
  username: string;
  password: string;
}

export interface UserDocument extends IUser, Document {}

export interface UserModel extends Model<UserDocument> {
  verifyUser(username: string, password: string): Promise<boolean>;
  createUser(username: string, password: string): Promise<UserDocument>;
}

const userSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const hashPassword = (password: string) => {
  // Use some hashing library
  return "hash_" + password;
};

userSchema.set("toJSON", {
  transform: (_: void, returnedObject: Record<string, string>) => {
    delete returnedObject["password"];
  },
});

userSchema.pre<UserDocument>("save", function (next) {
  if (this.isModified("password")) {
    this.password = hashPassword(this.password);
  }

  next();
});

userSchema.statics.verifyUser = async function (
  this: Model<UserDocument>,
  username: string,
  password: string
): Promise<boolean> {
  const user = await this.findOne({ username: username }).exec();
  if (!user) return false;

  if (user.password !== hashPassword(password)) return false;

  return true;
};

userSchema.statics.createUser = async function (
  this: Model<UserDocument>,
  username: string,
  password: string
): Promise<UserDocument> {
  const userExists = await User.findOne({ username });
  if (userExists) {
    throw new Error("Username is in use");
  }
  const user = new User({ username, password });
  const savedUser = await user.save();
  Profile.initializeUser(savedUser.id);
  return savedUser;
};

export const User = model<UserDocument, UserModel>("User", userSchema);
