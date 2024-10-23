import './common/env';
import Server from './common/server';
import routes from './routes'; // Ensure this is a function that takes (app: Application) => void
import dotenv from 'dotenv';

dotenv.config();

const port = parseInt(process.env.PORT ?? '3000'); // This is still fine

// Initialize the server with routes
const server = new Server().router(routes); // Ensure router method is correctly defined

// Pass the port to the listen method
server.listen(port); // Ensure listen method is defined to accept a port argument
