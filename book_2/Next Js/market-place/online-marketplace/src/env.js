import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),

    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),

    CLOUDINARY_CLOUD_NAME: z.string(),
    CLOUDINARY_API_KEY: z.string(),
    CLOUDINARY_API_SECRET: z.string(),
    UPLOAD_PRESET: z.string(),
  },

  client: {},

  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,

    CLOUDINARY_CLOUD_NAME:
      process.env.CLOUDINARY_CLOUD_NAME,

    CLOUDINARY_API_KEY:
      process.env.CLOUDINARY_API_KEY,

    CLOUDINARY_API_SECRET:
      process.env.CLOUDINARY_API_SECRET,

    UPLOAD_PRESET:
      process.env.UPLOAD_PRESET,
  },

  skipValidation: !!process.env.SKIP_ENV_VALIDATION,

  emptyStringAsUndefined: true,
});