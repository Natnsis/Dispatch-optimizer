import type { Request, Response } from 'express';
import userService from '../services/userService';
import type { Role } from '@prisma/client';

export async function listUsers(req: Request, res: Response) {
  const { role, search, page, pageSize } = req.query;
  const args: { role?: Role; search?: string; page?: number; pageSize?: number } = {};
  if (typeof role === 'string' && role.length) args.role = role as Role;
  if (typeof search === 'string' && search.length) args.search = search;
  if (typeof page === 'string' && page.length) args.page = Number(page);
  if (typeof pageSize === 'string' && pageSize.length) args.pageSize = Number(pageSize);
  const result = await userService.list(args);
  res.json(result);
}

export async function getUser(req: Request, res: Response) {
  const id = req.params.id as string;
  if (!id) return res.status(400).json({ error: 'Missing id' });
  const user = await userService.getById(id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
}

export async function createUser(req: Request, res: Response) {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) return res.status(400).json({ error: 'Missing fields' });
  try {
    const user = await userService.create({ name, email, password, role });
    res.status(201).json(user);
  } catch (e: any) {
    if (e.code === 'P2002') return res.status(409).json({ error: 'Email already exists' });
    res.status(500).json({ error: 'Failed to create user' });
  }
}

export async function updateUser(req: Request, res: Response) {
  const id = req.params.id as string;
  if (!id) return res.status(400).json({ error: 'Missing id' });
  const { name, email, password, role } = req.body;
  try {
    const user = await userService.update(id, { name, email, password, role });
    res.json(user);
  } catch (e: any) {
    if (e.code === 'P2025') return res.status(404).json({ error: 'User not found' });
    if (e.code === 'P2002') return res.status(409).json({ error: 'Email already exists' });
    res.status(500).json({ error: 'Failed to update user' });
  }
}

export async function deleteUser(req: Request, res: Response) {
  const id = req.params.id as string;
  if (!id) return res.status(400).json({ error: 'Missing id' });
  try {
    await userService.remove(id);
    res.status(204).send();
  } catch (e: any) {
    if (e.code === 'P2025') return res.status(404).json({ error: 'User not found' });
    res.status(500).json({ error: 'Failed to delete user' });
  }
}
