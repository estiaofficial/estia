require('dotenv').config();

import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();

// CORS configuration
const allowedOrigins = [
  'http://localhost:3000', // Local development
  'https://estiafrontend.vercel.app', // Production frontend
  'https://estiaprojects.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin, like mobile apps or curl requests
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,POST,PUT,DELETE',
  credentials: true, // Enable for cookies/auth headers if needed
}));

// Middleware
app.use(express.json());

// Root route handler
app.get('/', (req, res) => {
  res.json({ 
    message: 'Estia Backend API is running!',
    version: '1.0.0',
    endpoints: {
      projects: '/api/v1/projects',
      users: '/api/v1/users',
      comments: '/api/v1/comments',
      commentInteractions: '/api/v1/commentInteractions'
    }
  });
});

// API routes
routes(app);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.originalUrl,
    method: req.method
  });
});

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

const port = process.env.PORT || 3000;

// Only start server if not in Vercel environment
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(port, () => console.log(`Server ready on port ${port}.`));
}

// Export for Vercel
export default app;
