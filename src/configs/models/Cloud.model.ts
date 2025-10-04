import { Schema, models, model, Model } from "mongoose";
import { CloudDoc } from "../../types/models.types";

const cloud = new Schema<CloudDoc>({
  ip: {
    type: String,
    required: true,
    trim: true
  },
}, { 
  timestamps: true,
  versionKey : false
});

const CloudModel = (models.cloud as Model<CloudDoc>) || model<CloudDoc>('cloud', cloud);

export default CloudModel