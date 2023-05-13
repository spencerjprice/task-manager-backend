import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Task } from '@prisma/client';
import { TaskDto } from './app.dto';
import { AppService } from './app.service';

@Controller('/tasks')
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    @ApiOperation({ summary: 'Get all tasks' })
    @ApiResponse({ status: 200, description: 'All the tasks' })
    getTasks(): Promise<Task[]> {
        return this.appService.getTasks();
    }

    @Post()
    @ApiOperation({ summary: 'Create a task' })
    @ApiResponse({ status: 200, description: 'The created task' })
    createTask(@Body() body: TaskDto): Promise<Task> {
        return this.appService.createTask(body);
    }

    @Put()
    @ApiOperation({ summary: 'Update a task' })
    @ApiResponse({ status: 200, description: 'The updated task' })
    updateTask(@Body() body: Partial<TaskDto>): Promise<Task> {
        return this.appService.updateTask(body);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a task' })
    @ApiParam({
        name: 'id',
        type: 'string',
        description: 'The id of the task you want to delete',
    })
    @ApiResponse({ status: 200, description: 'The deleted task' })
    deleteTask(@Param('id') id: string): Promise<Task> {
        return this.appService.deleteTask(+id);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a task' })
    @ApiParam({
        name: 'id',
        type: 'string',
        description: 'The id of the task you want to get',
    })
    @ApiResponse({ status: 200, description: 'The task' })
    getTask(@Param('id') id: string): Promise<Task> {
        return this.appService.getTask(+id);
    }
}
