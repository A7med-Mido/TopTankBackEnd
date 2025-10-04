import { Schema } from "mongoose";

const CourseKeysSchema = new Schema({
  key: {
    type: String,
    required: true,
    trim: true
  },
  teacherUsername: {
    type: String,
    required: true,
    trim: true
  },
}, { 
  timestamps: true,
  versionKey : false
});

export default CourseKeysSchema