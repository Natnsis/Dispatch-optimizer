import { Request, Response } from 'express';
import { PrismaClient, ROLE } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { generateToken, setRefreshCookie } from '../middlewares/jwt.middleware';

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

export const LoginAdmin = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const admin = await prisma.user.findUnique({ where: { username } });
    if (admin) {
      const verified = await bcrypt.compare(password, admin.password);
      if (!verified) return res.json({ message: 'Invalid credentials' });
      const data = { userId: admin.id, role: admin.role };
      const { refreshToken, accessToken } = generateToken(data);
      setRefreshCookie(res, refreshToken);
      res.json({ accessToken: accessToken });
    } else {
      return res.json({ message: 'no such username found' });
    }
  } catch (e) {
    console.log(e);
  }
};

export const LogoutAdmin = async (req: Request, res: Response) => {
  try {
    res.clearCookie('refreshToken', {
      httpOnly: true,
    });

    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
