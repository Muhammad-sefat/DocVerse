import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma";

const seedAdmin = async () => {
  try {
    // CHECK EXISTING ADMIN
    const existingAdmin = await prisma.user.findFirst({
      where: {
        role: "ADMIN",
      },
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      return;
    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash("admin123", 10);

    // CREATE ADMIN
    const admin = await prisma.user.create({
      data: {
        name: "Super Admin",
        email: "admin@docverse.com",
        password: hashedPassword,
        role: "ADMIN",
      },
    });

    console.log("Admin created successfully");
    console.log(admin);
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
};

seedAdmin();
