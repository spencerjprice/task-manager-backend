import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { PrismaService } from './services/prisma.service';

@Injectable()
export class AppService {
    constructor(private prisma: PrismaService) {}

    async getTasks(): Promise<Task[]> {
        return this.prisma.task.findMany();
    }

    async createTask(task: Partial<Task>): Promise<Task> {
        return this.prisma.task.create({
            data: {
                title: task.title,
                description: task.description,
                dueDate: task.dueDate,
                status: task.status,
            },
        });
    }

    async updateTask(task: Partial<Task>): Promise<Task> {
        return this.prisma.task.update({
            where: {
                id: task.id,
            },
            data: task,
        });
    }

    async deleteTask(id: number): Promise<Task> {
        return this.prisma.task.delete({
            where: {
                id,
            },
        });
    }

    async getTask(id: number): Promise<Task> {
        return this.prisma.task.findUnique({
            where: {
                id,
            },
        });
    }
}
