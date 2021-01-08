import { Document, Schema, Model, model } from "mongoose";

export interface IUser {
  username: string;
  password: string;
}

export interface UserDocument extends IUser, Document {}

export interface UserModel extends Model<UserDocument> {
  verifyUser(username: string, password: string): Promise<boolean>;
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

export const User = model<UserDocument>("User", userSchema);
