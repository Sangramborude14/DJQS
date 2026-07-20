import {z} from 'zod'
import type { CreateJobRequest } from '../schemas/job.schema.js'
import { prisma } from '../config/prisma.js'
import { JobStatus } from '../generated/prisma/enums.js';



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

async fetchAndLockNextJob() {
    const now = new Date();

    //using a transaction for atomic row locking
    return await prisma.$transaction(async (tx:any) => {

    const jobs = await tx.$queryRaw<Array<{id: string}>>`
    SELECT id FROM "Job"
    WHERE "status" = 'PENDING' :: "JobStatus"
    AND ("runAt" is NULL OR runAt <= ${now})
    ORDER BY 
    CASE "priority"
        WHEN 'CRITICAL' :: "Priority" THEN 1
        WHEN 'HIGH' :: "Priority" THEN 2
        WHEN 'MEDIUM' :: "Priority" THEN 3
        WHEN 'LOW' :: "Priority" THEN 4
        ELSE 5
        END ASC,
        "createdAt" ASC
    LIMIT 1
    FOR UPDATE SKIP LOCKED
    `;
    if(jobs.length === 0){
        return null;
    }

    const jobId = jobs[0].id;

    // Transition from pending to running
    const updateJob = await tx.job.update({
        where: {id: jobId},
        data: {
            status: JobStatus.RUNNING,
            startedAt: now,
            attempts: {increment: 1},
        },
    })
    return updateJob;
    });
}
}
