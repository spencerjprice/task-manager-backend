import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma.service';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Prisma 🔼
    const prismaService = app.get(PrismaService);
    await prismaService.enableShutdownHooks(app);

    await app.listen(3000);
}

bootstrap().catch((err) => {
    console.error('Error Running nestjs', err);
});
