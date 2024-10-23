"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const users_service_1 = __importDefault(require("../../../api/services/users.service"));
class Controller {
    // Create
    create(req, res) {
        // #swagger.tags = ['Users']
        const user = req.body;
        try {
            users_service_1.default.create(user).then((r) => {
                res.status(201).location(`/api/v1/users/${r === null || r === void 0 ? void 0 : r.id}`).json(r);
            });
        }
        catch (error) {
            res.status(500).json({ message: 'Error creating user', error });
        }
    }
    // Read
    all(_, res) {
        // #swagger.tags = ['Users']
        try {
            users_service_1.default.all().then((r) => {
                res.json(r);
            });
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching users', error });
        }
    }
    byId(req, res) {
        // #swagger.tags = ['Users']
        const id = req.params.id;
        try {
            users_service_1.default.byId(id).then((r) => {
                if (r)
                    res.json(r);
                else
                    res.status(404).json({ message: 'User not found' });
            });
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching user', error });
        }
    }
    byUsername(req, res) {
        // #swagger.tags = ['Users']
        const username = req.params.username;
        try {
            users_service_1.default.byUsername(username).then((r) => {
                if (r)
                    res.json(r);
                else
                    res.status(404).json({ message: 'User not found' });
            });
        }
        catch (error) {
            res
                .status(500)
                .json({ message: 'Error fetching user by username', error });
        }
    }
    // Update
    update(req, res) {
        // #swagger.tags = ['Users']
        const id = req.params.id;
        const user = req.body; // Assuming you send the full User object
        try {
            users_service_1.default.update(id, user).then((r) => {
                if (r)
                    res.json(r);
                else
                    res.status(404).json({ message: 'User not found' });
            });
        }
        catch (error) {
            res.status(500).json({ message: 'Error updating user', error });
        }
    }
    // Delete
    delete(req, res) {
        // #swagger.tags = ['Users']
        const id = req.params.id;
        try {
            users_service_1.default.delete(id).then((r) => {
                if (r)
                    res.status(204).end();
                else
                    res.status(404).json({ message: 'User not found' });
            });
        }
        catch (error) {
            res.status(500).json({ message: 'Error deleting user', error });
        }
    }
}
exports.Controller = Controller;
exports.default = new Controller();
