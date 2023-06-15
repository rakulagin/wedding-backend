import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName : {
      type: String,
      required: true
    },
    surName : {
      type: String,
      required: true
    },
    nickname: {
      type: String,
    },
    img : {
      type: String,
    },
    accept : {
      type: String,
    },
    answered: {
      type: Boolean,
    },
    pair : {
      type: String,
    },
    place : {
      type: String,
    },
    car : {
      type: Boolean,
    },
    vine : {
      type: String,
    },
    spirit : {
      type: String,
    },
    secondDay: {
      type: String,
    },
  },
  {
    timestamps: true
  }
);

export default mongoose.model('User', UserSchema)