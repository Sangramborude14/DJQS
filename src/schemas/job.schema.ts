import {z} from 'zod';

export const createJobSchema = z.object({
    type: z.enum([
        "SEND_EMAIL",
        "GENERATE_PDF",
        "RESIZE_IMAGE",
        "TRANSCODE_VIDEO",
        "CALL_WEBHOOK",
        "SEND_NOTIFICATION",
        "PROCESS_PAYMENT",
        "GENERATE_REPORT",
    ]),
    payload: z.unknown(),
    priority: z.enum(["CRITICAL","HIGH","MEDIUM","LOW"]).default("LOW"),
    runAt: z.coerce.date().optional(),
})

export type CreateJobRequest = z.infer<typeof createJobSchema> 