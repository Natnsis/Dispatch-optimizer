import bcrypt from 'bcrypt';
import prisma from '../prisma/client';
import type { Role } from '@prisma/client';

export type CreateUserInput = {
  name: string;
  email: string;
  password: string;
  role: Role;
};

export type UpdateUserInput = Partial<Pick<CreateUserInput, 'name' | 'email' | 'password' | 'role'>>;

const list = async (opts: { role?: Role; search?: string; page?: number; pageSize?: number } = {}) => {
  const { role, search, page = 1, pageSize = 20 } = opts;
  const where: any = {};
  if (role) where.role = role;
  if (search) where.OR = [
    { name: { contains: search, mode: 'insensitive' } },
    { email: { contains: search, mode: 'insensitive' } },
  ];
  const [items, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { created_at: 'desc' },
      select: { id: true, name: true, email: true, role: true, created_at: true, updated_at: true },
    }),
    prisma.user.count({ where }),
  ]);
  return { items, total, page, pageSize };
};

const getById = (id: string) =>
  prisma.user.findUnique({
    where: { id },
    select: { id: true, name: true, email: true, role: true, created_at: true, updated_at: true },
  });

const create = async (input: CreateUserInput) => {
  const hash = await bcrypt.hash(input.password, 10);
  const user = await prisma.user.create({
    data: {
      name: input.name,
      email: input.email,
      password_hash: hash,
      role: input.role,
    },
    select: { id: true, name: true, email: true, role: true, created_at: true, updated_at: true },
  });
  return user;
};

const update = async (id: string, input: UpdateUserInput) => {
  const data: any = { ...input };
  if (input.password) {
    data.password_hash = await bcrypt.hash(input.password, 10);
    delete data.password;
  }
  return prisma.user.update({
    where: { id },
    data,
    select: { id: true, name: true, email: true, role: true, created_at: true, updated_at: true },
  });
};

const remove = (id: string) => prisma.user.delete({ where: { id } });

export default { list, getById, create, update, remove };
