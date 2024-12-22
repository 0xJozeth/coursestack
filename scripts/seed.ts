const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Computer Science" },
        { name: "Music" },
        { name: "Fitness" },
        { name: "Photography" },
        { name: "Engineering" },
        { name: "Filming" },
      ],
    });
    console.log("Sucessfully seeded database categories");
  } catch (error) {
    console.error("Error seeding to the database categories", error);
  } finally {
    await database.$disconnect();
  }
}

main();
