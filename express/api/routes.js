"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = routes;
const router_1 = __importDefault(require("../../backend/server/api/controllers/projects/router"));
const router_2 = __importDefault(require("../../backend/server/api/controllers/users/router"));
const router_3 = __importDefault(require("../../backend/server/api/controllers/comments/router"));
const router_4 = __importDefault(require("../../backend/server/api/controllers/commentInteractions/router"));
function routes(app) {
    app.use('/api/v1/projects', router_1.default);
    app.use('/api/v1/users', router_2.default);
    app.use('/api/v1/comments', router_3.default);
    app.use('/api/v1/commentInteractions', router_4.default);
}
