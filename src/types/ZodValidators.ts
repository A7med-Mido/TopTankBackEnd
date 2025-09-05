import { z } from "zod";

/** --- Basic Fields --- **/
export const usernameSchema = z
  .string()
  .regex(/^[A-Za-z0-9-]{4,20}$/, {
    message:
      "Username must be 4–20 characters long and contain only letters, numbers, and hyphens (-)",
  });

/** --- Video Schema --- **/
export const videoSchema = z.object({
  vid: z.string(),
  name: z.string(),
});

/** --- Course Schema --- **/
export const courseSchema = z.object({
  key: z.string(),
  name: z.string(),
  price: z.number().min(0),
  offer: z.number().min(0).optional(),
  thumbNail: z.string().url(),
  description: z.string(),
  subscriptions: z.number().nonnegative(),
  videos: z.array(videoSchema),
});

/** --- Teacher Schema --- **/
export const teacherSchema = z.object({
  name: z.string(),
  username: usernameSchema,
  phone: z.string().min(11).max(11),
  password: z.string().min(6),
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
  name: z.string(),
  phone: z.string(),
  password: z.string(),
  image: z.string().optional(),
  subscriptions: z.array(keysSchema).default([]),
  otp: z.string().min(6).max(6).default("")
});

/** --- Infer Types --- **/
export type TeacherInput = z.infer<typeof teacherSchema>;
export type StudentInput = z.infer<typeof studentSchema>;
export type CourseInput = z.infer<typeof courseSchema>;
