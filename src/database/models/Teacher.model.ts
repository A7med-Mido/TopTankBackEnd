import { Model, Schema, model, models } from "mongoose";
import { TeacherDoc } from "../../types/models.types";
import CourseSchema from "../schemas/Course.schema";

const teacher = new Schema<TeacherDoc>({
  name: { 
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  followers: {
    type: Number,
    default: 0
  },
  courses: [CourseSchema],
  otp: {
    type: String,
    // required: true,
    default: "",
    min: 6,
    max: 6
  }
},{ 
  timestamps: true,
  versionKey: false
});

const TeacherModel = (models.teacher as Model<TeacherDoc>) || model<TeacherDoc>('teacher', teacher);

export default TeacherModel;