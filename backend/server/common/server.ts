import express, { Application } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import http from 'http';
import os from 'os';
import cookieParser from 'cookie-parser';
import l from './logger';
import cors from 'cors';

import installValidator from './swagger';

const app = express();

export default class ExpressServer {
  private routes: (app: Application) => void;

  constructor() {
    const root = path.normalize(__dirname + '/../..');
    app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(
      bodyParser.urlencoded({
        extended: true,
        limit: process.env.REQUEST_LIMIT || '100kb',
      })
    );
    app.use(bodyParser.text({ limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(cookieParser(process.env.SESSION_SECRET));

    // Apply CORS before any other middleware
    if (process.env.NODE_ENV === 'production') {
      app.use(cors({
        origin: 'https://estiafrontend.vercel.app', // Specific frontend URL
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
      }));
    } else {
      app.use(cors({ origin: '*' }));  // Open for all in development
      app.use(express.static(`${root}/public`));
    }

    // Add a route to serve the api.yml Swagger spec file
    app.get('/api/v1/spec', (_, res) => {
      // Ensure the correct path is served both locally and in production
      const specPath = process.env.NODE_ENV === 'production'
        ? path.join(__dirname, '../../public/api-explorer/api.yml')
        : path.join(__dirname, '../../public/api-explorer/api.yml');

      // Log the path to verify on production
      console.log('Serving Swagger spec from:', specPath);

      // Apply CORS headers directly to the spec file response
      res.header('Access-Control-Allow-Origin', 'https://estiafrontend.vercel.app');
      res.sendFile(specPath);
    });
  }

  router(routes: (app: Application) => void): ExpressServer {
    this.routes = routes;
    return this;
  }

  listen(port: number = parseInt(process.env.PORT || '3000')): Application {
    const welcome = (p: number) => (): void =>
      l.info(
        `up and running in ${
          process.env.NODE_ENV || 'development'
        } @: ${os.hostname()}${p ? ` on port: ${p}` : ''}`
      );

    installValidator(app, this.routes)
      .then(() => {
        if (process.env.NODE_ENV === 'production') {
          // Vercel handles the server and port for production
          welcome(0)();
        } else {
          // In development, we create and listen on the port
          http.createServer(app).listen(port, welcome(port));
        }
      })
      .catch((e) => {
        l.error(e);
        process.exit(1);
      });

    return app;
  }
}

// Export the app for Vercel
export const vercelApp = app;
