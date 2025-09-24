import z from "zod";

const envSchema = z.object({
  DATABASE_URI: z.string(),
  JWT_SECRET: z.string(),
  PORT: z.number().transform(Number),
  SALT: z.string(),
});

const env = envSchema.parse(process.env);
export default env