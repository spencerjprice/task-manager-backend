import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
    }

    // eslint-disable-next-line @typescript-eslint/require-await
    async enableShutdownHooks(app: INestApplication) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-misused-promises
        this.$on('beforeExit', async (): Promise<void> => {
            await app.close();
        });
    }
}
