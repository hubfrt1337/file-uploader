import { prisma } from './lib/prisma.js';

async function main() {
    const user = await prisma.user.create({
        data: {
            email: `ziomal@wp.pl`,
            hash_password: `ziomal123`
        }
    })

    console.log("created user", user)

    const allUsers = await prisma.user.findMany({

    })
    console.log("All users:", allUsers, JSON.stringify(allUsers, null, 2));
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })