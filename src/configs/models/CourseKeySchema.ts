import { Schema } from "mongoose";



const KeysSchema = new Schema({
  key: String,
  teacherUsername: String,
}, { timestamps: true });


export default KeysSchema