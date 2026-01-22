import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("123456", 10);

  await prisma.user.create({
    data: {
      email: "test@company.com",
      password: hashedPassword
    }
  });

  console.log("✅ Test user created");
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
