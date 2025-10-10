import { Schema, model, models, Model } from "mongoose";
import { StudentDoc } from "../../types/models.types";
import CourseKeysSchema from "../schemas/CourseKey.schema";

const student = new Schema<StudentDoc>({
  name: { 
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    default: "",
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
  subscriptions: {
    type: [CourseKeysSchema],
    default: null
  },
  otp: {
    type: String,
    default: "",
    max: 6,
    min: 6
  }
}, { 
  timestamps: true,
  versionKey: false
});

const StudentModel = (models.student as Model<StudentDoc>) || model<StudentDoc>("student", student);


export default StudentModel;