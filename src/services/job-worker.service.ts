import type constants from "node:constants";
import { prisma } from "../config/prisma.js";
import { JobStatus } from "../generated/prisma/enums.js";
import type { JobRepository } from "../repositories/job.repositories.js";
import type { JobProcessingService } from "./job-processor.service.js";
import { error } from "node:console";

export class JobWorkerService {
    private isRunning: boolean = false;
    private pollInterval: number = 2000;

    constructor(
        private readonly repository: JobRepository,
        private readonly processor: JobProcessingService
    ) {}

    // Start polling background loop
    start() {
        if(this.isRunning) return;
        this.isRunning = true;
        console.log(`Worker background job worker started...`);
        this.loop();

    }

    //stop polling
    stop() {
        this.isRunning = false;
        console.log(`[Worker] Background job worker stopping gracefully`)
    }

    private async loop() {
        while(this.isRunning){
            try {
                const job = await this.repository.fetchAndLockNextJob();

                if( job) {
                    console.log(`[Worker] Found job ${job.id} of type ${job.type}. Executing...`);
                }else{
                    await new Promise((resolve) => setTimeout(resolve, this.pollInterval));
                }
            }catch(error){
                console.error(`[Worker] Error in polling loop`, error);

                await new Promise((resolve) => setTimeout(resolve,5000));
            }
        }
    }

    private async executeJob(job: any){
        try {
            // Execute the job handler
            await this.processor.process(job.type, job.payload);

            // On Success: Mark as COMPLETED
            await prisma.job.update({
                where: {id: job.id},
                data: {
                    status: JobStatus.COMPLETED,
                    completedAt: new Date(),
                },
            })
            console.log(`[Worker] Job ${job.id} completed successfully`);
        }catch(error: any){
            console.error(`[Worker] Job ${job.id} failed:`,error.message);
            await this.handleJobFailure(job, error.message);
        }
    }

    private async handleJobFailure(job:any , errorMessage: string) {
        const nextAttempts = job.attempts;
        const maxAttempts = job.maxAttempts;

        if(nextAttempts < maxAttempts){
            const backoffSeconds = Math.pow(2,nextAttempts);
            const runAt = new Date(Date.now() + backoffSeconds * 1000);

            await prisma.job.update({
                where: {id: job.id},
                data: {
                    status: JobStatus.DELAYED,
                    runAt,
                    lastError: errorMessage,
                },
            });
            console.log(`[Worker] Retrying Job ${job.id} in ${backoffSeconds}s (Attempt ${nextAttempts}/${maxAttempts})`);

        }else{
        // max attempts failed: Mark as FAILED
            await prisma.job.updata({
                where: {id: job.id},
                data: {
                    status: JobStatus.DELAYED,
                    completedAt: new Date(),
                    lastError: errorMessage,
                },
            });
            console.error(`[Worker] Job ${job.id} has failed permanently after ${maxAttempts} attempts`);
        }
    }
}