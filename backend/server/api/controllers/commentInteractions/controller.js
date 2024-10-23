"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const commentInteractions_service_1 = __importDefault(require("../../services/commentInteractions.service"));
class Controller {
    // Create
    create(req, res) {
        // #swagger.tags = ['CommentInteractions']
        /* #swagger.parameters['body'] = {
            in: 'body',
            description: 'Comment Interaction data.',
            required: true,
            schema: {
                comment_id: "",
                user_id: "",
                interaction: true
            }
        } */
        const commentInteraction = req.body;
        console.log(req.params);
        try {
            commentInteractions_service_1.default.create(commentInteraction, commentInteraction.comment_id).then((r) => {
                res.status(201).location(`/api/v1/commentInteractions/`).json(r);
            });
        }
        catch (error) {
            res.status(500).json({ message: 'Error creating comment', error });
        }
    }
    // Read
    all(req, res) {
        // #swagger.tags = ['CommentInteractions']
        const commentId = req.params.commentId;
        try {
            commentInteractions_service_1.default.getAll(commentId).then((r) => {
                res.json(r);
            });
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching comments', error });
        }
    }
    get(req, res) {
        // #swagger.tags = ['CommentInteractions']
        const commentId = req.params.commentId;
        const userId = req.params.userId;
        try {
            commentInteractions_service_1.default.getInteraction(commentId, userId).then((r) => {
                if (r)
                    res.json(r);
                else
                    res.status(404).json(null);
            });
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching comment', error });
        }
    }
    // Update
    update(req, res) {
        // #swagger.tags = ['CommentInteractions']
        /* #swagger.parameters['body'] = {
            in: 'body',
            description: 'Comment Interaction data.',
            required: true,
            schema: {
                interaction: true
            }
        } */
        const commentId = req.params.commentId;
        const userId = req.params.userId;
        const commentInteraction = req.body;
        try {
            commentInteractions_service_1.default.update(commentInteraction, commentId, userId).then((r) => {
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
        // #swagger.tags = ['CommentInteractions']
        /* #swagger.parameters['body'] = {
            in: 'body',
            description: 'Comment Interaction data.',
            required: true,
            schema: {
                comment_id: "",
                user_id: "",
                interaction: true
            }
        } */
        const commentId = req.params.commentId;
        const userId = req.params.userId;
        try {
            commentInteractions_service_1.default.delete(commentId, userId).then((r) => {
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
