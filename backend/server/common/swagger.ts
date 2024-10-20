import path from 'path';
import middleware from 'swagger-express-middleware';
import { Application } from 'express';
import errorHandler from '../api/middlewares/error.handler';

export default function (
  app: Application,
  routes: (app: Application) => void
): Promise<void> {
  return new Promise((resolve, reject) => {
    // Adjust the path for `api.yml` based on environment
    const apiSpecPath = process.env.NODE_ENV === 'production'
      ? path.join(__dirname, './api.yml')  // Adjust if necessary for Vercel
      : path.join(__dirname, 'api.yml');  // For local development
    
    middleware(apiSpecPath, app, function (err: Error, middleware) {
      if (err) {
        return reject(err);
      }

      // Enable case-sensitive and strict routing options
      app.enable('case sensitive routing');
      app.enable('strict routing');

      // Apply Swagger metadata and file serving middleware
      app.use(middleware.metadata());
      app.use(
        middleware.files(app, {
          apiPath: process.env.SWAGGER_API_SPEC || '/api/v1/spec',  // Default spec path
        })
      );

      app.use(
        middleware.parseRequest({
          // Secure cookies using session secret
          cookie: {
            secret: process.env.SESSION_SECRET || 'defaultSecret',  // Fallback for development
          },
          // Limit JSON content size
          json: {
            limit: process.env.REQUEST_LIMIT || '100kb',  // Fallback for size limit
          },
        })
      );

      // Apply CORS and request validation middleware
      app.use(middleware.CORS(), middleware.validateRequest());

      // Initialize the app routes after setting up middleware
      routes(app);

      // Apply global error handler for API
      app.use(errorHandler);

      resolve();
    });
  });
}
