require('dotenv').config();

import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();

// CORS configuration
const allowedOrigins = [
  'http://localhost:3000', // Local development
  'https://estiafrontend.vercel.app' // Production frontend
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

// Middleware and routes
app.use(express.json());
routes(app);

const port = process.env.PORT;
app.listen(port, () => console.log(`Server ready on port ${port}.`));

module.exports = app;
