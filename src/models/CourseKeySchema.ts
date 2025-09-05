import { Schema } from "mongoose";



const KeysSchema = new Schema({
  key: String,
  teacherUsername: String,
});

export default KeysSchema