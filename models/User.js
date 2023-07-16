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
    who: {
      type: String,
    },
    img : {
      type: String,
    },
    imgForWeddingHost : {
      type: String,
    },
    pair : {
      type: String,
    },
    ourHistory : {
      type: String,
    },
    side : {
      type: Number,
    },
    company : {
      type: Number,
    },
    weight : {
      type: Number,
    },
    activity: {
      type: Boolean
    },
    accept : {
      type: String,
    },
    answered: {
      type: Boolean,
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