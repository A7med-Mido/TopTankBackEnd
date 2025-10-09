import { AdminInput, CloudInput, StudentInput, TeacherInput, RevokedTokenInput } from "../zod/zod.validator";
import { Document } from "mongoose";

export interface StudentDoc extends StudentInput, Document {}
export interface TeacherDoc extends TeacherInput, Document {}
export interface AdminDoc extends AdminInput, Document {}
export interface CloudDoc extends CloudInput, Document {}
export interface RevokedToken extends RevokedTokenInput, Document {}