import { Schema, model, models } from "mongoose";
import { StudentInput } from "../types/ZodValidators";
import KeysSchema from "./CourseKeySchema";

interface StudentDoc extends StudentInput, Document {}

const teacher = new Schema<StudentDoc>({
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
  subscriptions: [KeysSchema],
  otp: {
    type: String,
    required: true,
    default: "",
    max: 6,
    min: 6
  }
});

const UserModel = models.user || model<StudentDoc>('teacher', teacher);

export default UserModel;