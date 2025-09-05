import { Schema, model, models } from "mongoose";
import { TeacherInput } from "../types/ZodValidators";
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
  courses: [CourseSchema]
});

const UserModel = models.user || model<TeacherDoc>('teacher', teacher);

export default UserModel;