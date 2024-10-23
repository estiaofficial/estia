"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = __importDefault(require("./controller"));
const router = express_1.default.Router();
router.post('/', controller_1.default.create);
router.get('/', controller_1.default.all);
router.get('/id/:id', controller_1.default.byId);
router.get('/username/:username', controller_1.default.byUsername);
router.patch('/:id', controller_1.default.update);
router.delete('/:id', controller_1.default.delete);
exports.default = router;
