import type { JobRepository } from "../repositories/job.repositories.js";
import type { CreateJobRequest } from "../schemas/job.schema.js";


export class JobService {
    constructor( private readonly repository: JobRepository){}

    async createJob(data: CreateJobRequest) {
        if (data.runAt && new Date(data.runAt).getTime() < Date.now() - 5000) {
            throw new Error("Scheduled execution time (runAt) cannot be in the past.");
        }
        return await this.repository.create(data);  
    }
}