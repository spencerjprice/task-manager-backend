import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PrismaService } from './services/prisma.service';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Validation
    app.useGlobalPipes(new ValidationPipe());

    // Swagger Docs
    const config = new DocumentBuilder()
        .setTitle('Task Manager')
        .setDescription('Simple endpoints to manage tasks')
        .setVersion('1.0')
        .addTag('tasks')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    // Prisma 🔼
    const prismaService = app.get(PrismaService);
    await prismaService.enableShutdownHooks(app);

    app.enableCors();
    await app.listen(3000);
}

bootstrap().catch((err) => {
    console.error('Error Running nestjs', err);
});
