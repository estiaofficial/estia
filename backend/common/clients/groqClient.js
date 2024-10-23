"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groq = void 0;
/* eslint-disable no-undef */
const groq_sdk_1 = require("groq-sdk");
exports.groq = new groq_sdk_1.Groq({
    apiKey: process.env.REACT_APP_GROQ_API_KEY,
});
