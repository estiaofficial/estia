require('dotenv').config();

import express from 'express';
import routes from './routes';

const app = express();

// Middleware and routes
app.use(express.json());
routes(app);

app.listen(process.env.PORT, () => console.log(`Server ready on port ${process.env.PORT}.`));

module.exports = app;
