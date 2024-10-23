"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const comments_service_1 = __importDefault(require("../../services/comments.service"));
class Controller {
    // Create
    create(req, res) {
        // #swagger.tags = ['Comments']
        /* #swagger.parameters['body'] = {
            in: 'body',
            description: 'Comment data.',
            required: true,
            schema: {
                content: "",
                user_id: "",
                project_id: "",
                likes: 0,
                username: ""
            }
        } */
        const comment = req.body;
        console.log("IN CONTROLLER");
        console.log(comment);
        try {
            comments_service_1.default.create(comment).then((r) => {
                res.status(201).location(`/api/v1/comments/${r === null || r === void 0 ? void 0 : r.commentId}`).json(r);
            });
        }
        catch (error) {
            res.status(500).json({ message: 'Error creating comment', error });
        }
    }
    // Read
    all(_, res) {
        // #swagger.tags = ['Comments']
        try {
            comments_service_1.default.getAll().then((r) => {
                res.json(r);
            });
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching comments', error });
        }
    }
    // Fetch comments by project ID
    byProjectId(req, res) {
        // #swagger.tags = ['Comments']
        const projectId = req.params.projectId;
        try {
            comments_service_1.default.getByProjectId(projectId).then((r) => {
                if (r && r.length > 0) {
                    res.json(r);
                }
                else {
                    res
                        .status(404)
                        .json({ message: 'No comments found for this project' });
                }
            });
        }
        catch (error) {
            res
                .status(500)
                .json({ message: 'Error fetching comments by project ID', error });
        }
    }
    byCommentId(req, res) {
        // #swagger.tags = ['Comments']
        const id = req.params.id;
        try {
            comments_service_1.default.getByCommentId(id).then((r) => {
                if (r)
                    res.json(r);
                else
                    res.status(404).json({ message: 'Comment not found' });
            });
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching comment', error });
        }
    }
    // Update
    update(req, res) {
        // #swagger.tags = ['Comments']
        const id = req.params.id;
        const comment = req.body;
        try {
            comments_service_1.default.update(id, comment).then((r) => {
                if (r)
                    res.json(r);
                else
                    res.status(404).json({ message: 'Comment not found' });
            });
        }
        catch (error) {
            res.status(500).json({ message: 'Error updating comment', error });
        }
    }
    // Delete
    delete(req, res) {
        // #swagger.tags = ['Comments']
        const id = req.params.id;
        try {
            comments_service_1.default.delete(id).then((r) => {
                if (r)
                    res.status(204).end();
                else
                    res.status(404).json({ message: 'Comment not found' });
            });
        }
        catch (error) {
            res.status(500).json({ message: 'Error deleting comment', error });
        }
    }
}
exports.Controller = Controller;
exports.default = new Controller();
