import { Status, Task } from '@prisma/client';
import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
    let appController: AppController;
    let appService: AppService;
    const task = {
        id: 1,
    };

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [AppController],
            providers: [
                {
                    provide: AppService,
                    useValue: createMock<AppService>({
                        getTasks: jest.fn().mockResolvedValue([task]),
                        createTask: jest.fn().mockResolvedValue(task),
                        updateTask: jest.fn().mockResolvedValue(task),
                        deleteTask: jest.fn().mockResolvedValue(task),
                        getTask: jest.fn().mockResolvedValue(task),
                    }),
                },
            ],
        }).compile();

        appController = app.get<AppController>(AppController);
        appService = app.get<AppService>(AppService);
    });

    describe('getTasks', () => {
        it('should call appService.getTasks and return an array of tasks', async () => {
            const tasks = await appController.getTasks();
            expect(appService.getTasks).toHaveBeenCalled();
            expect(tasks).toEqual([task]);
        });
    });

    describe('createTask', () => {
        it('should call appService.createTask and return a task', async () => {
            const body = {
                title: 'test',
                description: 'test',
                dueDate: new Date(),
                status: Status.NEW,
            } as Task;
            const createdTask = await appController.createTask(body);
            expect(appService.createTask).toHaveBeenCalledWith(body);
            expect(createdTask).toEqual(task);
        });
    });

    describe('updateTask', () => {
        it('should call appService.updateTask and return a task', async () => {
            const body = {
                title: 'test',
                description: 'test',
                dueDate: new Date(),
                status: Status.NEW,
            } as Task;

            const updatedTask = await appController.updateTask('1', body);
            expect(appService.updateTask).toHaveBeenCalledWith(1, body);
            expect(updatedTask).toEqual(task);
        });
    });

    describe('deleteTask', () => {
        it('should call appService.deleteTask and return a task', async () => {
            const deletedTask = await appController.deleteTask('1');
            expect(appService.deleteTask).toHaveBeenCalledWith(1);
            expect(deletedTask).toEqual(task);
        });
    });

    describe('getTask', () => {
        it('should call appService.getTask and return a task', async () => {
            const deletedTask = await appController.getTask('1');
            expect(appService.getTask).toHaveBeenCalledWith(1);
            expect(deletedTask).toEqual(task);
        });
    });
});
