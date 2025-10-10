import { Request, Response } from 'express';
import { PrismaClient, ROLE } from '@prisma/client';
import { imageUploader } from '../middlewares/multer.middleware';
const prisma = new PrismaClient();

export const addDispatcher = async (req: Request, res: Response) => {
  try {
    const { fName, lName, username, password, districtId } = req.body;
    if (!req.file) return res.json('no file added');
    const uploaded = await imageUploader(req.file.buffer);
    await prisma.user.create({
      data: {
        fName,
        lName,
        username,
        url: uploaded.secure_url,
        password,
        districtId,
        role: ROLE.Dispatcher,
      },
    });
    res.status(201).json({ message: 'dispatcher created successfully' });
  } catch (e) {
    res.json(e);
  }
};

export const deleteDispatcher = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({ where: { id } });
    res.status(200).json({ message: 'dispatcher deleted successfully' });
  } catch (e) {
    console.log(e);
  }
};

export const updataDispatcher = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { fName, lName, url, password, districtId } = req.body;
    await prisma.user.update({
      data: { fName, lName, url, password, districtId },
      where: { id },
    });
    res.status(200).json({ message: 'dispatcher deleted successfully' });
  } catch (e) {
    console.log(e);
  }
};

export const getAllDispatchers = async (req: Request, res: Response) => {
  try {
    const data = await prisma.user.findMany({
      where: { role: 'Dispatcher' },
      orderBy: { createdAt: 'desc' },
    });
    res.status(200).json(data);
  } catch (e) {
    console.log(e);
  }
};

export const getDispatcher = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await prisma.user.findFirst({ where: { id } });
    res.status(200).json(data);
  } catch (e) {
    console.log(e);
  }
};
