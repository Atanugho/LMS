import cookieParser from 'cookie-parser';
config();
import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import errorMiddleware from './middlewares/error.middleware.js';
import userRoutes from './routes/user.routes.js';
import courseRoutes from './routes/course.routes.js';
import miscRoutes from './routes/admin.routes.js';
import paymentRoutes from './routes/payment.routes.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
  })
);
app.use(morgan('dev'));
app.use(cookieParser());

// Server Status Check Route
app.get('/ping', (_req, res) => {
  res.send('Pong');
});




app.use('/api/v1/user', userRoutes);
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1', miscRoutes);


app.all('*', (_req, res) => {
  res.status(404).send('OOPS!!! 404 Page Not Found');
});

app.use(errorMiddleware);

export default app;