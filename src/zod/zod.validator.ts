import { TFunction } from "i18next";
import { z, ZodError } from "zod";

/** --- Basic Fields --- **/
export const usernameSchema = z
  .string()
  .regex(/^[A-Za-z0-9-]{4,20}$/, {
    message: "errors.username.invalid",
  });

/** --- UserRole --- **/
export const userRole = z
  .enum(["teacher", "student", "admin"], {
    message: "errors.userRole.invalid",
  })
  .nonoptional();

/** --- Name Validation --- **/
const nameValidation = z.string().max(50, {
  message: "errors.name.too_long",
});

/** --- Phone Validation --- **/
const phoneValidation = z
  .string()
  .min(11, { message: "errors.phone.invalid" })
  .max(11, { message: "errors.phone.invalid" });

/** --- Video Schema --- **/
export const videoSchema = z.object({
  vid: z.string().url({ message: "errors.video.invalid_url" }),
  name: z.string().max(170, {
    message: "errors.video.name_too_long",
  }),
});

/** --- Course Schema --- **/
export const courseSchema = z.object({
  key: z.string(),
  name: z.string().max(150, {
    message: "errors.course.name_too_long",
  }),
  price: z.number().min(0, { message: "errors.course.invalid_price" }).nonnegative(),
  free: z.boolean(),
  offer: z.number().min(0, { message: "errors.course.invalid_offer" }).nonnegative().optional(),
  thumbNail: z.string().url({ message: "errors.course.invalid_thumbnail" }),
  description: z.string().max(350, {
    message: "errors.course.description_too_long",
  }),
  subscriptions: z.number().nonnegative(),
  videos: z.array(videoSchema),
});

/** --- Teacher Schema --- **/
export const teacherSchema = z.object({
  name: nameValidation,
  username: usernameSchema,
  phone: phoneValidation,
  password: z
    .string()
    .min(9, { message: "errors.password.too_short" })
    .max(24, { message: "errors.password.too_long" }),
  image: z.string().url({ message: "errors.teacher.invalid_image" }).optional(),
  verified: z.boolean().default(false),
  followers: z.number().default(0),
  balance: z.number().default(0),
  courses: z.array(courseSchema).default([]),
  otp: z.string().min(6, { message: "errors.teacher.otp_invalid" }).max(6, { message: "errors.teacher.otp_invalid" }).default(""),
  user: userRole,
});

/** --- Student Schema --- **/
export const keysSchema = z.object({
  key: z.string(),
  teacherUsername: usernameSchema,
});

export const studentSchema = z.object({
  name: nameValidation,
  phone: z
    .string()
    .min(11, { message: "errors.phone.invalid" })
    .max(11, { message: "errors.phone.invalid" }),
  password: z
    .string()
    .min(9, { message: "errors.password.too_short" })
    .max(24, { message: "errors.password.too_long" }),
  image: z.string().optional(),
  subscriptions: z.array(keysSchema).default([]).optional(),
  otp: z.string().min(6, { message: "errors.student.otp_invalid" }).max(6, { message: "errors.student.otp_invalid" }).default("").optional(),
  user: userRole,
});

export const adminSchema = z.object({
  email: z.email(),
  phone: z
    .string()
    .min(11, { message: "errors.phone.invalid" })
    .max(11, { message: "errors.phone.invalid" }),
  otp: z.string().min(6, { message: "errors.student.otp_invalid" }).max(6, { message: "errors.student.otp_invalid" }).default("").optional(),
  user: userRole,
});

export const ip = z.union([z.string().ipv4(), z.string().ipv6()])

export const cloudSchema = z.object({ ip });


/** --- Infer Types --- **/
export type UserRole = z.infer<typeof userRole>
export type AdminInput = z.infer<typeof adminSchema>;
export type TeacherInput = z.infer<typeof teacherSchema>;
export type StudentInput = z.infer<typeof studentSchema>;
export type CourseInput = z.infer<typeof courseSchema>;
export type CloudInput = z.infer<typeof cloudSchema>;




export const zodErrorFormatter = (error: ZodError, t: TFunction) => {
  const { issues } = error
  
  return issues.map(err => ({
    field: err.path.join('.'),
    message: t(err.message as any),
    code: err.code
  }))
}
