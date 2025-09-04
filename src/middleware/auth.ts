import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env';

type AuthPayload = { userId: string; role: string };
type AuthRequest = Request & { user?: AuthPayload };

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' });
  const token = auth.slice(7);
  try {
    const payload = jwt.verify(token, JWT_SECRET) as AuthPayload;
    (req as AuthRequest).user = payload;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

export function adminOnly(req: Request, res: Response, next: NextFunction) {
  const r = req as AuthRequest;
  if (!r.user || r.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
  next();
}
