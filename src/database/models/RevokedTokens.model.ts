import { Schema, models, model, Model } from "mongoose";
import { RevokedToken } from "../../types/models.types";

const token = new Schema<RevokedToken>({
  token: {
    type: String,
    required: true,
    trim: true
  },
}, { 
  timestamps: true,
  versionKey : false
});

const RevokedTokenModel = (models.token as Model<RevokedToken>) || model<RevokedToken>('token', token);

export default RevokedTokenModel