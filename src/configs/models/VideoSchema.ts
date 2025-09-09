import { Schema,  } from "mongoose"

const VideoSchema = new Schema({
  vid: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }, 
}, { 
  timestamps: true,
  versionKey: false
});

export default VideoSchema