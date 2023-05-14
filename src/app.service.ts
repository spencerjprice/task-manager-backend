import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { PrismaService } from './services/prisma.service';

// Main service of the task manager
@Injectable()
export class AppService {
    constructor(private prisma: PrismaService) {}

    // Gets all tasks
    async getTasks(): Promise<Task[]> {
        return this.prisma.task.findMany();
    }

    // Creates a task
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

    // Updates a task
    async updateTask(id: number, task: Partial<Task>): Promise<Task> {
        return this.prisma.task.update({
            where: {
                id,
            },
            data: task,
        });
    }

    // Deletes a task
    async deleteTask(id: number): Promise<Task> {
        return this.prisma.task.delete({
            where: {
                id,
            },
        });
    }

    // Gets a task
    async getTask(id: number): Promise<Task> {
        return this.prisma.task.findUnique({
            where: {
                id,
            },
        });
    }
}
