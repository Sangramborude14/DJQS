import type { JobRepository } from "../repositories/job.repositories.js";
import type { CreateJobRequest } from "../schemas/job.schema.js";


export class JobService {
    constructor( private readonly repository: JobRepository){}

    async createJob(data: CreateJobRequest){
        if(data.runAt && new Date(data.runAt) < new Date()){
            throw new Error(`not to be executed now !!`)
        }
        return await this.repository.create(data);  
    }
}