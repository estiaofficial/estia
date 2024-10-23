"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
// Middleware and routes
app.use(express_1.default.json());
(0, routes_1.default)(app);
app.listen(process.env.PORT, () => console.log(`Server ready on port ${process.env.PORT}.`));
module.exports = app;
