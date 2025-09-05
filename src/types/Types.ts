import type { Document } from "mongoose"
import { z } from "zod";

const usernameSchema = z.string().regex(/^[A-Za-z0-9-]{4,20}$/);

type Username = z.infer<typeof usernameSchema>;

export const videoSchema = z.object({
  vid: z.string(),
  name: z.string(),
});

export type Video = z.infer<typeof videoSchema>;

type CourseKey = string

export type Course = {
  key: CourseKey
  name: string
  price: number
  offer?: number
  thumbNail: string
  description: string
  subscriptions: number
  videos: Video[]
}

export interface Teacher extends Document {
  name: string
  username: Username
  phone: string
  password: string
  image: string
  verified: boolean
  followers: number
  balance: number
  courses: Course[]
}

export interface Student extends Document {
  name: string
  phone: string
  password: string
  image: string
  subscriptions: Keys[]
}

export type Keys = {
  key: CourseKey
  teacherUsername: Username
}