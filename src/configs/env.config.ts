import z from "zod";

const envSchema = z.object({
  DATABASE_URI: z.string(),
  JWT_SECRET: z.string(),
  PORT: z.string().transform(Number),
});

const env = envSchema.parse(process.env);
export default env