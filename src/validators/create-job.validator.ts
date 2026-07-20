import type { Request, Response, NextFunction } from "express";
import type { ZodSchema } from "zod";

export function validate(schema: ZodSchema, target: "body" | "params" | "query") {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req[target]);
        if (result.success) {
            req[target] = result.data;
            return next();
        } else {
            return res.status(400).json({
                success: false,
                error: "Validation failed",
                details: result.error.issues
            });
        }
    };
}