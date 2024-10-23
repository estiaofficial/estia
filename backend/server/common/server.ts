import express, { Application } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import http from 'http';
import os from 'os';
import cookieParser from 'cookie-parser';
import l from './logger';
import cors from 'cors';
import routes from '../routes'; // Import your routes

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
    const corsOptions = {
      origin: process.env.NODE_ENV === 'production'
        ? 'https://estiafrontend.vercel.app'
        : ['https://estiafrontend.vercel.app', 'http://localhost:3000'],
      credentials: true,
    };
    app.use(cors(corsOptions));

    if (process.env.NODE_ENV !== 'production') {
      app.use(express.static(`${root}/public`));
    }

    // Add a route to serve the api.yml Swagger spec file (if needed)
    app.get('/api/v1/spec', (_, res) => {
      const specPath = path.join(__dirname, '../../public/api-explorer/api.yml');
      console.log('Serving Swagger spec from:', specPath);
      res.sendFile(specPath);
    });
  }

  router(routes: (app: Application) => void): ExpressServer {
    this.routes = routes;
    return this;
  }

  listen(port: number = parseInt(process.env.PORT || '8080')): Application {
    const welcome = (p: number) => (): void =>
      l.info(
        `up and running in ${
          process.env.NODE_ENV || 'development'
        } @: ${os.hostname()}${p ? ` on port: ${p}` : ''}`
      );

    // Initialize your routes here
    routes(app);

    if (process.env.NODE_ENV === 'production') {
      welcome(0)();
    } else {
      http.createServer(app).listen(port, welcome(port));
    }

    return app;
  }
}

// Export the app for Vercel
export const vercelApp = app;
