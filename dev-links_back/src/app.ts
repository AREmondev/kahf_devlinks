import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import swaggerUi from 'swagger-ui-express';
import v1AuthRoutes from './routes/v1/authRoutes';
import v1UserRoutes from './routes/v1/userRoutes';
import errorHandler from './middleware/errorHandler';
import connectDB from './config/database';
import logger from './utils/logger';
import swaggerSpec from './config/swagger';
import path from 'path';

const app: Application = express();

// Configure CORS
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || 'http://localhost:3000',
      'https://app.vercel.com',
    ],
    credentials: true,
  })
);

// Middleware
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Versioned Routes
app.use('/api/v1/auth', v1AuthRoutes);
app.use('/api/v1/users', v1UserRoutes);

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Error Handling
app.use(errorHandler);

// Connect to Database
connectDB();

// Server
const PORT: number = parseInt(process.env.PORT || '8000', 10);
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));

export default app;
