"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const projects_service_1 = __importDefault(require("../../services/projects.service"));
class Controller {
    // Create
    create(req, res) {
        // #swagger.tags = ['Projects']
        const project = req.body;
        try {
            projects_service_1.default.create(project).then((r) => {
                res.status(201).location(`/api/v1/projects/${r === null || r === void 0 ? void 0 : r.projectId}`).json(r);
            });
        }
        catch (error) {
            res.status(500).json({ message: 'Error creating project', error });
        }
    }
    // Read
    all(_, res) {
        // #swagger.tags = ['Projects']
        try {
            projects_service_1.default.getAll().then((r) => {
                res.json(r);
            });
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching projects', error });
        }
    }
    byId(req, res) {
        // #swagger.tags = ['Projects']
        const id = req.params.id;
        try {
            projects_service_1.default.getByProjectId(id).then((r) => {
                if (r)
                    res.json(r);
                else
                    res.status(404).json({ message: 'Project not found' });
            });
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching project', error });
        }
    }
    byName(req, res) {
        // #swagger.tags = ['Projects']
        const name = req.params.name;
        try {
            projects_service_1.default.getByProjectName(name).then((r) => {
                if (r)
                    res.json(r);
                else
                    res.status(404).json({ message: 'Project not found' });
            });
        }
        catch (error) {
            res
                .status(500)
                .json({ message: 'Error fetching project by name', error });
        }
    }
    // Update
    update(req, res) {
        // #swagger.tags = ['Projects']
        const id = req.params.id;
        const project = req.body; // Assuming you send the full Project object
        try {
            projects_service_1.default.update(id, project).then((r) => {
                if (r)
                    res.json(r);
                else
                    res.status(404).json({ message: 'Project not found' });
            });
        }
        catch (error) {
            res.status(500).json({ message: 'Error updating project', error });
        }
    }
    // Delete
    delete(req, res) {
        // #swagger.tags = ['Projects']
        const id = req.params.id;
        try {
            projects_service_1.default.delete(id).then((r) => {
                if (r)
                    res.status(204).end();
                else
                    res.status(404).json({ message: 'Project not found' });
            });
        }
        catch (error) {
            res.status(500).json({ message: 'Error deleting project', error });
        }
    }
    // New method to fetch projects by user ID
    byUserId(req, res) {
        // #swagger.tags = ['Projects']
        const userId = req.params.userId;
        try {
            projects_service_1.default.getByUserId(userId).then((r) => {
                if (r)
                    res.json(r);
                else {
                    res.status(404).json({ message: 'No projects found for this user' });
                }
            });
        }
        catch (error) {
            res
                .status(500)
                .json({ message: 'Error fetching projects by user ID', error });
        }
    }
    bySavedUserId(req, res) {
        // #swagger.tags = ['Projects']
        const userId = req.params.userId;
        try {
            projects_service_1.default.getBySavedUserId(userId).then((r) => {
                if (r)
                    res.json(r);
                else
                    res.status(404).json({ message: 'No projects found for this user' });
            });
        }
        catch (error) {
            res
                .status(500)
                .json({ message: 'Error fetching projects saved by user ID', error });
        }
    }
    byLikedUserId(req, res) {
        // #swagger.tags = ['Projects']
        const userId = req.params.userId;
        try {
            projects_service_1.default.getByLikedUserId(userId).then((r) => {
                if (r)
                    res.json(r);
                else
                    res.status(404).json({ message: 'No projects found for this user' });
            });
        }
        catch (error) {
            res
                .status(500)
                .json({ message: 'Error fetching projects liked by user ID', error });
        }
    }
    saveProject(req, res) {
        // #swagger.tags = ['Projects']
        const projectId = req.params.projectId;
        const userId = req.params.userId;
        try {
            projects_service_1.default.saveProject(projectId, userId).then((r) => {
                res.json(r);
            });
        }
        catch (error) {
            res.status(500).json({ message: 'Error saving project', error });
        }
    }
    likeProject(req, res) {
        // #swagger.tags = ['Projects']
        const projectId = req.params.projectId;
        const userId = req.params.userId;
        try {
            projects_service_1.default.likeProject(projectId, userId).then((r) => {
                res.json(r);
            });
        }
        catch (error) {
            res.status(500).json({ message: 'Error liking project', error });
        }
    }
}
exports.Controller = Controller;
exports.default = new Controller();
