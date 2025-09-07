import { z } from "zod";

/** --- Basic Fields --- **/
export const usernameSchema = z
  .string()
  .regex(/^[A-Za-z0-9-]{4,20}$/, {
    message:
      "Username must be 4–20 chars and contain only letters, numbers, and hyphens (-).",
  });

/** --- Video Schema --- **/
export const videoSchema = z.object({
  vid: z.string().url(),
  name: z
  .string()
  .max(170, { message: "The name must be less than 170 chars" }),
});

/** --- Course Schema --- **/
export const courseSchema = z.object({
  key: z.string(),
  name: z
  .string()
  .max(150, { message: "Use a shorter name for that course, less than 150 chars." }),
  price: z.number().min(0).nonnegative(),
  free: z.boolean(),
  offer: z.number().min(0).nonnegative().optional(),
  thumbNail: z.string().url(),
  description: z
  .string()
  .max(350, { message: "The description must be less than 350 chars." }),
  subscriptions: z.number().nonnegative(),
  videos: z.array(videoSchema),
});

/** --- Teacher Schema --- **/
export const teacherSchema = z.object({
  name: z
  .string()
  .max(50, { message: "Your name must be less than 50 chars." }),
  username: usernameSchema,
  phone: z.
  string()
  .min(11, { message: "Wrong phone number." })
  .max(11, { message: "Wrong phone number." }),
  password: z
  .string()
  .min(6, { message: "Short password, you need at least 6" }),
  image: z.string().url().optional(),
  verified: z.boolean().default(false),
  followers: z.number().default(0),
  balance: z.number().default(0),
  courses: z.array(courseSchema).default([]),
  otp: z.string().min(6).max(6).default("")
});

/** --- Student Schema --- **/
export const keysSchema = z.object({
  key: z.string(),
  teacherUsername: usernameSchema,
});

export const studentSchema = z.object({
  name: z
  .string()
  .max(50, { message: "Your name must be less than 50 chars." }),
  phone: z
  .string()
  .min(11, { message: "Wrong phone number." })
  .max(11, { message: "Wrong phone number." }),
  password: z
  .string()
  .min(12, { message: "Your password must be more than 12 chars." })
  .max(24, { message: "Your password must be less than 24 chars." }),
  image: z.string().optional(),
  subscriptions: z.array(keysSchema).default([]).optional(),
  otp: z.string().min(6).max(6).default("").optional(),
  user: z.enum(["teacher", "student"])
});

/** --- Infer Types --- **/
export type TeacherInput = z.infer<typeof teacherSchema>;
export type StudentInput = z.infer<typeof studentSchema>;
export type CourseInput = z.infer<typeof courseSchema>;
