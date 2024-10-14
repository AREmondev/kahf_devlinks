import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Application } from 'express';
import path from 'path';
import config from '../config/config';

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Link Sharing App API Documentation',
    version: '1.0.0',
    description:
      'This is the REST API documentation for the Link Sharing Application built with Express, TypeScript, and MongoDB.',
    contact: {
      name: 'Your Name',
      email: 'youremail@example.com',
    },
    servers: [
      {
        url: `http://localhost:${config.port}`,
        description: 'Development server',
      },
      // Add production server URLs here
    ],
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

// Options for swagger-jsdoc
const options: swaggerJSDoc.Options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: [
    path.join(__dirname, '../routes/*.ts'),
    path.join(__dirname, '../models/*.ts'),
  ],
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

// Function to setup Swagger UI
const setupSwagger = (app: Application): void => {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export { setupSwagger };
