"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabase = void 0;
/* eslint-disable no-undef */
const supabase_js_1 = require("@supabase/supabase-js");
exports.supabase = (0, supabase_js_1.createClient)(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
