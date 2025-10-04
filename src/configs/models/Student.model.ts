import { Schema, model, models } from "mongoose";
import { StudentDoc } from "../../types/models.types";
import CourseKeysSchema from "../schemas/CourseKey.schema";

const student = new Schema<StudentDoc>({
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
  subscriptions: [CourseKeysSchema],
  otp: {
    type: String,
    // required: true,
    default: "",
    max: 6,
    min: 6
  }
}, { 
  timestamps: true,
  versionKey: false
});

const StudentModel = models.student || model<StudentDoc>('student', student);

export default StudentModel;