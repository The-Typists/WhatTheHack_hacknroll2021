import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./User";

export interface IProfile extends Document {
  user: IUser["_id"];
  wordPerMinute: number;
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

export const Profile = mongoose.model<IProfile>("Profile", profileSchema);
