import { Schema } from "mongoose"
import VideoSchema from "./Video.schema";

const CourseSchema = new Schema({
  key: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
  },
  offer: {
    type: Number,
    required: false,
  },
  thumbNail: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  subscriptions: {
    type: Number,
    required: true,
    default: 0
  },
  videos: {
    type: [VideoSchema],
    default: undefined
  },
}, { 
  timestamps: true,
  versionKey: false
});

export default CourseSchema