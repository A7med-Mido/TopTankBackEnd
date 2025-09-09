import { StudentInput, TeacherInput } from "../middlewares/zodValidators"

export interface StudentDoc extends StudentInput, Document {}
export interface TeacherDoc extends TeacherInput, Document {}
