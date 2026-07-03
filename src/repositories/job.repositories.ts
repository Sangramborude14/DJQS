import {z} from 'zod'
import type { CreateJobRequest } from '../schemas/job.schema.js'
import { prisma } from '../config/prisma.js'



export class JobRepository {
async create(data: CreateJobRequest){
    //database code

    return prisma.job.create({
        data: {

            type: data.type,
            payload: data.payload,
            priority: data.priority,
            runAt: data.runAt || null,
            
        }
    })
}
}