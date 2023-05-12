import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
    constructor(private prisma: PrismaService) {}

    async getHello(): Promise<Task[]> {
        const tasks = await this.prisma.task.findMany();

        return tasks;
    }
}
