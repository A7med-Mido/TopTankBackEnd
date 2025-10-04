import { Schema, models, model } from "mongoose";
import { AdminDoc } from "../../types/models.types";

const admin = new Schema<AdminDoc>({
  email: {
    type: String,
    required: true,
    trim: true
  },
  otp: {
    type: String,
    required: false,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  }
}, { 
  timestamps: true,
  versionKey : false
});

const AdminModel = models.admin || model<AdminDoc>('admin', admin);


export default AdminModel