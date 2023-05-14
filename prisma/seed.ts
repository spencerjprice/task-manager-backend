import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

// This is a script to seed your database with test data.
async function main() {
    console.log(`Start seeding ...`);

    // Create 20 tasks
    await Promise.all(
        Array(20)
            .fill(0)
            .map(async () => {
                await prisma.task.create({
                    data: {
                        title: faker.music.songName(),
                        description: faker.lorem.paragraph({ min: 3, max: 7 }),
                        dueDate: faker.date.soon({ days: 30 }),
                    },
                });
            }),
    );
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
