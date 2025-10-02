import { Request, Response } from 'express';
import { PrismaClient, ROLE } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const RegisterAdmin = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        role: ROLE.Admin,
      },
    });
    res.status(201).json({ message: 'admin registered successfully' });
  } catch (e) {
    res.json('error occurred');
  }
};

