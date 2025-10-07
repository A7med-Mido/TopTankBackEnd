import { ip } from "../zod/zod.validator"



export interface CloudFetchHook {
  path: "/state" | "/trash" | "/clean" | "/upload" | "/remove"
  ip: string
  body?: any
  action: "post" | "get" | "delete" | "patch"
}