
import type { Request,Response,NextFunction } from "express";
import { JobRepository } from "../repositories/job.repositories.js";
import { JobService } from "../services/job.services.js";
import { success } from "zod";

const repository = new JobRepository();
const service = new JobService(repository);

export class JobController {
    async create(req: Request,res: Response,next: NextFunction){
        try{
            const job = await service.createJob(req.body);

              res.status(201).json({
                success: true,
                data: job,
            })
        }catch(error){
            next(error);
        }
    }
}