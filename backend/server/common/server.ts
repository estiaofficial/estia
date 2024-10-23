import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import routes from '../../../express/api/routes'; // Import your routes

const app = express();

export default class ExpressServer {
  private routes: (app: Application) => void;

  constructor() {
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
  }

  // This function is correct, it receives the routes function and calls it with `app`
  router(routes: (app: Application) => void): ExpressServer {
    this.routes = routes;
    return this;
  }

  // In the listen function, we call the routes
  listen(port?: number): Application {
    // Initialize your routes here
    routes(app);

    const serverPort = port || parseInt(process.env.PORT || '3000');
    
    // In production, Vercel manages the port, so don't create the server explicitly
    if (process.env.NODE_ENV === 'production') {
      console.log(`Running in production mode`);
    } else {
      // For development, create the server and listen on the specified port
      app.listen(serverPort, () => {
        console.log(`Server is running on port ${serverPort}`);
      });
    }

    return app;
  }
}

// Export the app for Vercel
export const vercelApp = app;
