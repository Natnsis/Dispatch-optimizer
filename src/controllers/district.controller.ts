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
