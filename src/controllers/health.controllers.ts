import type { Request,Response } from "express"
import { config } from "../config/env.js"


export const checkHealth = (req: Request,res: Response) => {
    return res.status(200).json({
        status: "ok",
        uptime: process.uptime(),
        timestamp: new Date(),
        environment: config.nodeEnv,
    })
}