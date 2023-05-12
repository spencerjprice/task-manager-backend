import { Controller, Get } from '@nestjs/common';
import { Task } from '@prisma/client';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getTasks(): Promise<Task[]> {
        console.log(process.env.DEEZ);

        return this.appService.getHello();
    }
}
