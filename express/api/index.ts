require('dotenv').config();

const express = require('express');
const app = express();

// Import routes
import routes from "./routes";

app.use(express.static('public'));

// Use the imported routes
routes(app);

app.listen(process.env.PORT, () => console.log(`Server ready on port ${process.env.PORT}.`));

module.exports = app;
