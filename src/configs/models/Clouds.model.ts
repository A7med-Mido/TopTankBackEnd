import { Schema } from "mongoose";

const CloudsSchema = new Schema({
  ip: {
    type: String,
    required: true,
    trim: true
  },
}, { 
  timestamps: true,
  versionKey : false
});

export default CloudsSchema