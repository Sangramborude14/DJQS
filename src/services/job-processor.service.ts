import { set } from "zod";
import  { JobType } from "../generated/prisma/enums.js";
import { resolve } from "node:dns";

export class JobProcessingService {
    async process(type: JobType, payload: any): Promise<void> {
        console.log(`[Processor] Processing job of type: ${type}`);

        switch(type){
            case JobType.SEND_EMAIL:
                await this.handleSendEmail(payload);
                break;
            case JobType.GENERATE_PDF:
                await this.handleGeneratePdf(payload);
                break;
            case JobType.SEND_NOTIFICATION:
                await this.handleSendNotification(payload);
                break;
            default:
                console.log(`[Processor] Default handler for type: ${type}`);

                await new Promise((resolve) => setTimeout(resolve,1000));
                break;
        }
    }
    private async handleSendEmail(payload: any){
        console.log(`Sending Email to ${payload?.to || "user@gmail.com"} with subject: ${payload?.subject || "subject"}`);
        
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log(`Email sent successfully`);
    }
    private async handleGeneratePdf(payload: any){
       console.log(`Genrating PDF report for document ID: ${payload?.documentId || "123"}`);
       await new Promise((resolve) => setTimeout(resolve, 2000));
       console.log(`PDF generated successfully`);
    }
    private async handleSendNotification(payload: any){
        console.log(`Push Notification sent: ${payload?.message || 
            "Notification"}`);
        await new Promise((resolve) => setTimeout(resolve, 800));
    }
}