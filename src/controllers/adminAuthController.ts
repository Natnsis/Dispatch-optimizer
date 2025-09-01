import type { Request, Response } from 'express';
import authService from '../services/authService';

export async function adminLogin(req: Request, res: Response) {
  const { email, password } = req.body;
  const result = await authService.login(email, password);
  if (result.error) return res.status(result.status).json({ error: result.error });
  res.json(result.data);
}

export async function adminRefresh(req: Request, res: Response) {
  const { refreshToken } = req.body;
  const result = await authService.refresh(refreshToken);
  if (result.error) return res.status(result.status).json({ error: result.error });
  res.json(result.data);
}
