import { PrismaClient } from "@prisma/client/extension";
import {PrismaPg} from '@prisma/client';

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
})

export const prisma = new PrismaClient({adapter});