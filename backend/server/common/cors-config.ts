import { CorsOptions } from 'cors';

export const corsOptions: CorsOptions = {
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
};
