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
exports.ProjectsService = void 0;
const logger_1 = __importDefault(require("../../common/logger"));
const clients_1 = require("../../../common/clients");
class ProjectsService {
    // Create
    create(newProject) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`Creating project with name: ${newProject.projectName}`);
            try {
                const { data, error } = yield clients_1.supabase
                    .from('estia_projects')
                    .insert(newProject)
                    .select();
                if (error) {
                    logger_1.default.error(`Error creating project: ${error.message}`);
                    return null;
                }
                return data[0] || null;
            }
            catch (err) {
                logger_1.default.error(`Unexpected error: ${err}`);
                return null;
            }
        });
    }
    // Read
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info('Fetching all projects');
            try {
                const { data, error } = yield clients_1.supabase.from('estia_projects').select('*');
                if (error) {
                    logger_1.default.error(`Error fetching projects: ${error.message}`);
                    return null;
                }
                return data || null;
            }
            catch (err) {
                logger_1.default.error(`Unexpected error: ${err}`);
                return null;
            }
        });
    }
    getByProjectId(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`Fetching project with id: ${projectId}`);
            try {
                const { data, error } = yield clients_1.supabase
                    .from('estia_projects')
                    .select('*')
                    .eq('project_id', projectId)
                    .single();
                if (error) {
                    logger_1.default.error(`Error fetching project: ${error.message}`);
                    return null;
                }
                return data || null;
            }
            catch (err) {
                logger_1.default.error(`Unexpected error: ${err}`);
                return null;
            }
        });
    }
    getByProjectName(projectName) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`Fetching projects with name: ${projectName}`);
            try {
                const { data, error } = yield clients_1.supabase
                    .from('estia_projects')
                    .select('*')
                    .eq('project_name', projectName);
                if (error) {
                    logger_1.default.error(`Error fetching project: ${error.message}`);
                    return null;
                }
                return data || null;
            }
            catch (err) {
                logger_1.default.error(`Unexpected error: ${err}`);
                return null;
            }
        });
    }
    // Update
    update(projectId, updatedProject) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`Updating project with id: ${projectId}`);
            try {
                const { data, error } = yield clients_1.supabase
                    .from('estia_projects')
                    .update(updatedProject)
                    .eq('project_id', projectId)
                    .select();
                if (error) {
                    logger_1.default.error(`Error updating project: ${error.message}`);
                    return null;
                }
                return data[0] || null;
            }
            catch (err) {
                logger_1.default.error(`Unexpected error: ${err}`);
                return null;
            }
        });
    }
    // Delete
    delete(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`Deleting project with id: ${projectId}`);
            try {
                const { error } = yield clients_1.supabase
                    .from('estia_projects')
                    .delete()
                    .eq('project_id', projectId);
                if (error) {
                    logger_1.default.error(`Error deleting project: ${error.message}`);
                    return false;
                }
                return true;
            }
            catch (err) {
                logger_1.default.error(`Unexpected error: ${err}`);
                return false;
            }
        });
    }
    // Search projects by user ID
    getByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`Fetching projects for user with id: ${userId}`);
            try {
                const { data, error } = yield clients_1.supabase
                    .from('estia_projects')
                    .select('*')
                    .eq('created_by', userId);
                if (error) {
                    logger_1.default.error(`Error fetching projects for user: ${error.message}`);
                    return null;
                }
                return data || null;
            }
            catch (err) {
                logger_1.default.error(`Unexpected error: ${err}`);
                return null;
            }
        });
    }
    getBySavedUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`Fetching projects saved by user with id: ${userId}`);
            try {
                const { data, error } = yield clients_1.supabase
                    .from('saved_projects')
                    .select('*')
                    .eq('profile_id', userId);
                if (error) {
                    logger_1.default.error(`Error fetching projects saved by user: ${error.message}`);
                    return null;
                }
                if (data) {
                    const projectIds = data.map((project) => project.project_id);
                    const { data: projectsData, error: projectsError } = yield clients_1.supabase
                        .from('estia_projects')
                        .select('*')
                        .in('project_id', projectIds);
                    if (projectsError) {
                        logger_1.default.error(`Error fetching project details: ${projectsError.message}`);
                        return null;
                    }
                    return projectsData || null;
                }
                else {
                    return null;
                }
            }
            catch (err) {
                logger_1.default.error(`Unexpected error: ${err}`);
                return null;
            }
        });
    }
    getByLikedUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`Fetching projects liked by user with id: ${userId}`);
            try {
                const { data, error } = yield clients_1.supabase
                    .from('liked_projects')
                    .select('*')
                    .eq('profile_id', userId);
                if (error) {
                    logger_1.default.error(`Error fetching projects saved by user: ${error.message}`);
                    return null;
                }
                if (data) {
                    const projectIds = data.map((project) => project.project_id);
                    const { data: projectsData, error: projectsError } = yield clients_1.supabase
                        .from('estia_projects')
                        .select('*')
                        .in('project_id', projectIds);
                    if (projectsError) {
                        logger_1.default.error(`Error fetching project details: ${projectsError.message}`);
                        return null;
                    }
                    return projectsData || null;
                }
                else {
                    return null;
                }
            }
            catch (err) {
                logger_1.default.error(`Unexpected error: ${err}`);
                return null;
            }
        });
    }
    saveProject(projectId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`Toggling save status for project ${projectId} by user ${userId}`);
            try {
                // Check if the project is already saved
                const { data: existingSave, error: checkError } = yield clients_1.supabase
                    .from('saved_projects')
                    .select()
                    .eq('profile_id', userId)
                    .eq('project_id', projectId)
                    .single();
                if (checkError && checkError.code !== 'PGRST116') {
                    logger_1.default.error(`Error checking saved status: ${checkError.message}`);
                    return false;
                }
                if (existingSave) {
                    // Unsave project
                    const { error: deleteError } = yield clients_1.supabase
                        .from('saved_projects')
                        .delete()
                        .eq('profile_id', userId)
                        .eq('project_id', projectId);
                    if (deleteError) {
                        logger_1.default.error(`Error unsaving project: ${deleteError.message}`);
                        return false;
                    }
                }
                else {
                    // Save project
                    const { error: insertError } = yield clients_1.supabase
                        .from('saved_projects')
                        .insert([{ profile_id: userId, project_id: projectId }]);
                    if (insertError) {
                        logger_1.default.error(`Error saving project: ${insertError.message}`);
                        return false;
                    }
                }
                return true;
            }
            catch (err) {
                logger_1.default.error(`Unexpected error in saveProject: ${err}`);
                return false;
            }
        });
    }
    likeProject(projectId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`Toggling like status for project ${projectId} by user ${userId}`);
            try {
                // Check if the project is already liked
                const { data: existingLike, error: checkError } = yield clients_1.supabase
                    .from('liked_projects')
                    .select()
                    .eq('profile_id', userId)
                    .eq('project_id', projectId)
                    .single();
                if (checkError && checkError.code !== 'PGRST116') {
                    logger_1.default.error(`Error checking liked status: ${checkError.message}`);
                    return false;
                }
                if (existingLike) {
                    // Unlike project
                    const { error: deleteError } = yield clients_1.supabase
                        .from('liked_projects')
                        .delete()
                        .eq('profile_id', userId)
                        .eq('project_id', projectId);
                    if (deleteError) {
                        logger_1.default.error(`Error unliking project: ${deleteError.message}`);
                        return false;
                    }
                }
                else {
                    // Like project
                    const { error: insertError } = yield clients_1.supabase
                        .from('liked_projects')
                        .insert([{ profile_id: userId, project_id: projectId }]);
                    if (insertError) {
                        logger_1.default.error(`Error liking project: ${insertError.message}`);
                        return false;
                    }
                }
                return true;
            }
            catch (err) {
                logger_1.default.error(`Unexpected error in likeProject: ${err}`);
                return false;
            }
        });
    }
}
exports.ProjectsService = ProjectsService;
exports.default = new ProjectsService();
