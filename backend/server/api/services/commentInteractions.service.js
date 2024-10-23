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
exports.CommentInteractionsService = void 0;
const logger_1 = __importDefault(require("../../common/logger"));
const clients_1 = require("../../../common/clients");
// creating a comment interaction, this will result in an update in comment table as well
class CommentInteractionsService {
    //helper function
    updateLikes(comment, likes) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(comment);
            console.log(comment.likes);
            const { data: updatedCommentData, error: updateError } = yield clients_1.supabase
                .from('comments')
                .update({ likes: comment.likes + likes })
                .eq('comment_id', comment.comment_id)
                .select();
            if (updateError) {
                logger_1.default.error(`Error when updating number of interactions with a comment: ${updateError}`);
            }
            console.log(`updated: ${updatedCommentData}`);
            return updatedCommentData;
        });
    }
    getComment(commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield clients_1.supabase
                .from('comments')
                .select()
                .eq('comment_id', commentId)
                .single();
            if (error) {
                logger_1.default.error(`Error getting comment: ${error}`);
                return null; // if no rows are found or if other errors occur
            }
            console.log(`get comment: ${data}`);
            return data;
        });
    }
    create(commentInteraction, commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`Creating new comment interaction for comment: ${commentInteraction.comment_id}`);
            const { data: commentInteractionData, error: commentInteractionError } = yield clients_1.supabase
                .from('comment_interactions')
                .insert(commentInteraction)
                .select()
                .single();
            if (commentInteractionError) {
                logger_1.default.error(`Error creating comment interaction: ${commentInteractionError.message}`);
                return null;
            }
            let likes = 1;
            if (commentInteraction.interaction === false) {
                likes = -1;
            }
            const comment = yield this.getComment(commentId);
            yield this.updateLikes(comment, likes);
            return commentInteractionData;
        });
    }
    getAll(commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info('Fetching all comment interactions');
            const { data, error } = yield clients_1.supabase.from('comment_interactions')
                .select('*')
                .eq('comment_id', commentId);
            if (error) {
                logger_1.default.error(`Error fetching all comment interactions: ${error.message}`);
                return null;
            }
            return data;
        });
    }
    getInteraction(commentId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`Fetching comment interaction with id: ${commentId}, ${userId}`);
            const { data, error } = yield clients_1.supabase
                .from('comment_interactions')
                .select()
                .eq('comment_id', commentId)
                .eq('user_id', userId)
                .single();
            if (error) {
                logger_1.default.error(`Error fetching comment interaction by id: ${error.message}`);
                return null;
            }
            console.log(data);
            return data;
        });
    }
    update(commentInteractionData, commentId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`Updating comment with id: ${commentId}, ${userId}`);
            const commentInteraction = yield this.getInteraction(commentId, userId);
            if ((commentInteraction === null || commentInteraction === void 0 ? void 0 : commentInteraction.interaction) != commentInteractionData.interaction) {
                let likes = 2;
                if (commentInteractionData.interaction === false) {
                    likes = -2;
                }
                const comment = yield this.getComment(commentId);
                yield this.updateLikes(comment, likes);
            }
            const { data, error } = yield clients_1.supabase
                .from('comment_interactions')
                .update(commentInteractionData)
                .eq('comment_id', commentId)
                .eq('user_id', userId)
                .select()
                .single();
            if (error) {
                logger_1.default.error(`Error updating comment: ${error.message}`);
                return null;
            }
            return data;
        });
    }
    // deleting a comment by selecting commentid and userid
    delete(commentId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`Deleting comment with comment id: ${commentId} and user id: ${userId}`);
            const { data, error } = yield clients_1.supabase
                .from('comment_interactions')
                .delete()
                .eq('comment_id', commentId)
                .eq('user_id', userId)
                .select();
            if (error) {
                logger_1.default.error(`Error deleting comment: ${error.message}`);
                return false;
            }
            if (data) {
                const interactionData = data;
                let likes = -1;
                if (interactionData[0].interaction === false) {
                    likes = 1;
                }
                const comment = yield this.getComment(commentId);
                yield this.updateLikes(comment, likes);
                return true;
            }
            return false;
        });
    }
}
exports.CommentInteractionsService = CommentInteractionsService;
exports.default = new CommentInteractionsService();
