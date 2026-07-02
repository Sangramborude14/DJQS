import {z} from "zod";

const envSchema = z.object({
    PORT: z.coerce.number().int().min(1).max(65535).default(3000),
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.enum(["development","production","test"]).default("development").optional(),
})

const config = envSchema.parse(process.env);