import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { ROLE } from '@prisma/client';
dotenv.config();
import { Response } from 'express';

interface UserData {
  userId: string;
  role: ROLE;
}

export const generateToken = (user: UserData) => {
  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN!, {
    expiresIn: '15m',
  });
  const refreshToken = jwt.sign({ user }, process.env.REFRESH_TOKEN!, {
    expiresIn: '7d',
  });
  return { accessToken, refreshToken };
};

export const setRefreshCookie = (res: Response, refreshToken: string) => {
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 1000,
  });
};
