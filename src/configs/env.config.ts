import z from "zod";

const envSchema = z.object({
  DATABASE_URI: z.string(),
  JWT_SECRET: z.string(),
  PORT: z.string().transform(Number),
  SALT: z.string(),
  GMAIL_APP_PASSWORD: z.string(),
  GMAIL_ADDR: z.email(),
  TOKEN_ISSUER: z.string(),
  TOKEN_AUDIENCE: z.string(),
  APP_KEY: z.string()
});

const env = envSchema.parse(process.env);
export default env