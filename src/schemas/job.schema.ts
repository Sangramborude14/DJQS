import {z} from 'zod';

const jobSchema = z.object({
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
    runAt: z.coerce.date(),
})