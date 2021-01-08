import mongoose, { Schema, Document, Model } from "mongoose";
import { UserDocument, User } from "./User";

export interface IProfile {
  user: UserDocument["_id"];
  wordPerMinute: number;
}

export interface ProfileDocument extends Document {}

export interface ProfileModel extends Model<ProfileDocument> {
  findProfileByUsername(username: string): Promise<ProfileModel | undefined>;
  findProfileByUserId(id: string): Promise<ProfileModel | undefined>;
}

const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  wordPerMinute: {
    type: Number,
  },
});

profileSchema.statics.findProfileByUsername = async function (
  this: Model<ProfileDocument>,
  username: string
) {
  const userFound = await User.findOne({ username: username }).exec();

  if (!userFound) return undefined;

  const user = userFound as UserDocument;

  return this.findOne({ user: user.id }).exec();
};

profileSchema.statics.findProfileByUserId = async function (
  this: Model<ProfileDocument>,
  id: string
) {
  return this.findOne({ user: id }).exec();
};

export const Profile = mongoose.model<ProfileDocument>(
  "Profile",
  profileSchema
);
