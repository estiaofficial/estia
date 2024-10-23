"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pino = require('pino');
const l = pino({
    name: process.env.APP_ID,
    level: process.env.LOG_LEVEL,
});
exports.default = l;
