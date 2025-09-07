import { Schema, model, models } from "mongoose";
import { TeacherInput } from "../../types/zodValidation";
import CourseSchema from "./CourseSchema";

interface TeacherDoc extends TeacherInput, Document {}

const teacher = new Schema<TeacherDoc>({
  name: { 
    type: String,
    required: true,
    trim: true,
    unique: true
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
    required: true,
    default: "",
    min: 6,
    max: 6
  }
});

const TeacherModel = models.user || model<TeacherDoc>('teacher', teacher);

export default TeacherModel;