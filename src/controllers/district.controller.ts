import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const addDistrict = async (req: Request, res: Response) => {
  try {
    const { name, latitude, longitude } = req.body;
    await prisma.district.create({
      data: {
        name,
        longitude,
        latitude,
      },
    });
    res.status(201).json({ message: 'district added successfully' });
  } catch (e) {
    console.log(e);
    res.json({ message: 'error occured' });
  }
};

export const deleteDistrict = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.district.delete({ where: { id } });
    res.status(200).json({ message: 'deleted successfully' });
  } catch (e) {
    console.log(e);
  }
};

export const getDistrict = async (req: Request, res: Response) => {
  try {
    const data = await prisma.district.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.status(200).json(data);
  } catch (e) {
    console.log(e);
  }
};
