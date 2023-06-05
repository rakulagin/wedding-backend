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
    img : {
      type: String,
    },
    accept : {
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
    capacity: {
      type: Number,
    },
    vine : {
      type: String,
    },
    spirit : {
      type: String,
    },
  },
  {
    timestamps: true
  }
);

export default mongoose.model('User', UserSchema)