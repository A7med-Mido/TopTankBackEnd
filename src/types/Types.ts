import { StudentInput, TeacherInput } from "../middlewares/zodValidators";
import { Document } from "mongoose";

export interface StudentDoc extends StudentInput, Document {}
export interface TeacherDoc extends TeacherInput, Document {}