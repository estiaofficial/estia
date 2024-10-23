"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsService = void 0;
const logger_1 = __importDefault(require("../../common/logger"));
const clients_1 = require("../../../common/clients");
class CommentsService {
    create(comment) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`Creating new comment for post: ${comment.projectId}`);
            console.log("IN SERVICE");
            console.log(comment);
            const { data, error } = yield clients_1.supabase
                .from('comments')
                .insert(comment)
                .single();
            if (error) {
                logger_1.default.error(`Error creating comment: ${error.message}`);
                return null;
            }
            return data;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info('Fetching all comments');
            const { data, error } = yield clients_1.supabase.from('comments').select('*');
            if (error) {
                logger_1.default.error(`Error fetching all comments: ${error.message}`);
                return null;
            }
            return data;
        });
    }
    getByCommentId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`Fetching comment with id: ${id}`);
            const { data, error } = yield clients_1.supabase
                .from('comments')
                .select('*')
                .eq('comment_id', id)
                .single();
            if (error) {
                logger_1.default.error(`Error fetching comment by id: ${error.message}`);
                return null;
            }
            return data;
        });
    }
    // returns an array of all comments
    getByProjectId(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`Fetching comments for post: ${projectId}`);
            const { data, error } = yield clients_1.supabase
                .from('comments')
                .select('*')
                .eq('project_id', projectId);
            if (error) {
                logger_1.default.error(`Error fetching comments by post id: ${error.message}`);
                return null;
            }
            return data;
        });
    }
    update(id, commentData) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`Updating comment with id: ${id}`);
            const { data, error } = yield clients_1.supabase
                .from('comments')
                .update(commentData)
                .eq('comment_id', id)
                .select()
                .single();
            if (error) {
                logger_1.default.error(`Error updating comment: ${error.message}`);
                return null;
            }
            return data;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`Deleting comment with id: ${id}`);
            const { error } = yield clients_1.supabase.from('comments').delete().eq('comment_id', id);
            if (error) {
                logger_1.default.error(`Error deleting comment: ${error.message}`);
                return false;
            }
            return true;
        });
    }
}
exports.CommentsService = CommentsService;
exports.default = new CommentsService();
