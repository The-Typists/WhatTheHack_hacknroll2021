import { profile } from "console";
import mongoose, { Schema, Document, Model } from "mongoose";
import { UserDocument, User } from "./User";

export interface IProfile {
  user: UserDocument["_id"];
  totalAttempts: number;
  totalCharacters: number;
  totalWords: number;
  totalTime: number;
  listOfCode: string[];
}

export interface ProfileDocument extends IProfile, Document {}

export interface ProfileModel extends Model<ProfileDocument> {
  findProfileByUsername(username: string): Promise<ProfileModel | undefined>;
  findProfileByUserId(id: string): Promise<ProfileModel | undefined>;
  initializeUser(id: string): void;
  updateProfile(username: string, totalAttempts: number, totalCharacters: number, totalWords: number,
    totalTime: number): Promise<ProfileDocument>;
  addCode(id: string, code: string): Promise<ProfileDocument>;
}

const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  totalAttempts: {
    type: Number,
  },
  totalCharacters: {
    type: Number,
  },
  totalWords: {
    type: Number,
  },
  totalTime: {
    type: Number,
  },
  listOfCode: {
    type: [String]
  }
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

profileSchema.statics.initializeUser = async function (
  this: Model<ProfileDocument>,
  id: string
) {
  const profile = new Profile({ user: id, totalAttempts: 0, totalCharacters: 0, totalWords: 0, totalTime: 0});
  profile.save();
};

profileSchema.statics.updateProfile = async function (
  this: Model<ProfileDocument>,
  user: string,
  totalAttempts: number,
  totalCharacters: number,
  totalWords: number,
  totalTime: number
): Promise<ProfileDocument> {
  const profileExists = await Profile.findOne({ user });
  if (!profileExists) {
    throw new Error("invalid user id provided.");
  }
  profileExists.totalAttempts += totalAttempts;
  profileExists.totalCharacters += totalCharacters;
  profileExists.totalTime += totalTime;
  profileExists.totalWords += totalWords;
  await profileExists.save();

  return profileExists;
};

profileSchema.statics.addCode = async function (
  this: Model<ProfileDocument>,
  user: string,
  code: string,
): Promise<ProfileDocument> {
  const profileExists = await Profile.findOne({ user });
  if (!profileExists) {
    throw new Error("invalid user id provided.");
  }
  profileExists.listOfCode.push(code);
  await profileExists.save();

  return profileExists;
}

export const Profile = mongoose.model<ProfileDocument, ProfileModel>(
  "Profile",
  profileSchema
);
