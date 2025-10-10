import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import AuthRoutes from './routes/auth.routes';
import DispatcherRoutes from './routes/dispatcher.routes';
import DistrictRoutes from './routes/district.routes';

dotenv.config();

const app = express();

//middlewares
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

//routes
app.use('/auth', AuthRoutes);
app.use('/dispatcher', DispatcherRoutes);
app.use('/district', DistrictRoutes);

// Health check
app.get('/', (_req: Request, res: Response) => {
  res
    .status(200)
    .json({ message: '✅ Server running with TypeScript + Prisma!' });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
});
