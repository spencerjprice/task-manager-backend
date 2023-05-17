import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Logger,
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
    private readonly logger = new Logger(AppController.name);

    constructor(private readonly appService: AppService) {}

    @Get()
    @ApiOperation({ summary: 'Get all tasks' })
    @ApiResponse({ status: 200, description: 'All the tasks' })
    getTasks(): Promise<Task[]> {
        try {
            this.logger.log('Getting all tasks');
            return this.appService.getTasks();
        } catch (error) {
            this.logger.error('Error getting all tasks', { error });
            throw new BadRequestException(error.message);
        }
    }

    @Post()
    @ApiOperation({ summary: 'Create a task' })
    @ApiResponse({ status: 200, description: 'The created task' })
    createTask(@Body() body: TaskDto): Promise<Task> {
        try {
            this.logger.log('Creating a task');
            return this.appService.createTask(body);
        } catch (error) {
            this.logger.error('Error creating a task', { error });
            throw new BadRequestException(error.message);
        }
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a task' })
    @ApiParam({
        name: 'id',
        type: 'string',
        description: 'The id of the task you want to update',
    })
    @ApiResponse({ status: 200, description: 'The updated task' })
    updateTask(
        @Param('id') id: string,
        @Body() body: Partial<TaskDto>,
    ): Promise<Task> {
        try {
            this.logger.log('Updating a task');
            return this.appService.updateTask(+id, body);
        } catch (error) {
            this.logger.error('Error updating a task', { error });
            throw new BadRequestException(error.message);
        }
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
        try {
            this.logger.log('Deleting a task');
            return this.appService.deleteTask(+id);
        } catch (error) {
            this.logger.error('Error deleting a task', { error });
            throw new BadRequestException(error.message);
        }
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
        try {
            this.logger.log('Getting a task');
            return this.appService.getTask(+id);
        } catch (error) {
            this.logger.error('Error getting a task', { error });
            throw new BadRequestException(error.message);
        }
    }
}
