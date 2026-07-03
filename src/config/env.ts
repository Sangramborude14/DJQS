import {z} from "zod";

const envSchema = z.object({
    port: z.coerce.number().int().min(1).max(65535).default(3000),
    databaseUrl: z.string().url(),
    nodeEnv: z.enum(["development","production","test"]).default("development").optional(),
})

export const config = envSchema.parse(process.env);