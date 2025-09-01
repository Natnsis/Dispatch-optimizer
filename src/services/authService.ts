import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import prisma from '../prisma/client';
import { JWT_SECRET, REFRESH_TOKEN_EXPIRY } from '../config/env';

function generateAccessToken(userId: string, role: string) {
  return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: '15m' });
}

function generateRefreshToken() {
  return crypto.randomBytes(32).toString('hex');
}

const login = async (email: string, password: string) => {
  if (!email || !password) return { error: 'Email and password required', status: 400 };
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || user.role !== 'admin') return { error: 'Invalid credentials', status: 401 };
  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return { error: 'Invalid credentials', status: 401 };
  const accessToken = generateAccessToken(user.id, user.role);
  const refreshToken = generateRefreshToken();
  const refreshTokenHash = await bcrypt.hash(refreshToken, 10);
  const expiresAt = new Date(Date.now() + REFRESH_TOKEN_EXPIRY);
  await prisma.session.create({
    data: {
      user_id: user.id,
      refresh_token_hash: refreshTokenHash,
      expires_at: expiresAt,
    },
  });
  return { data: { accessToken, refreshToken } };
};

const refresh = async (refreshToken: string) => {
  if (!refreshToken) return { error: 'Refresh token required', status: 400 };
  const sessions = await prisma.session.findMany({
    where: { expires_at: { gt: new Date() } },
    include: { user: true },
  });
  let session = null;
  for (const s of sessions) {
    if (await bcrypt.compare(refreshToken, s.refresh_token_hash) && s.user.role === 'admin') {
      session = s;
      break;
    }
  }
  if (!session) return { error: 'Invalid or expired refresh token', status: 401 };
  const accessToken = generateAccessToken(session.user_id, session.user.role);
  return { data: { accessToken } };
};

export default { login, refresh };
