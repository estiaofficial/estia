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
exports.UsersService = void 0;
const logger_1 = __importDefault(require("../../common/logger"));
const clients_1 = require("../../../common/clients");
class UsersService {
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`Creating new profile: ${user.username}`);
            const { data, error } = yield clients_1.supabase
                .from('profiles')
                .insert(user)
                .select()
                .single();
            if (error) {
                logger_1.default.error(`Error creating profile: ${error.message}`);
                return null;
            }
            return data;
        });
    }
    all() {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info('Fetching all profiles');
            const { data, error } = yield clients_1.supabase.from('profiles').select('*');
            if (error) {
                logger_1.default.error(`Error fetching all profiles: ${error.message}`);
                return null;
            }
            return data;
        });
    }
    byId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`Fetching profile with id: ${id}`);
            const { data, error } = yield clients_1.supabase
                .from('profiles')
                .select('*')
                .eq('id', id)
                .single();
            if (error) {
                logger_1.default.error(`Error fetching profile by id: ${error.message}`);
                return null;
            }
            return data;
        });
    }
    byUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`Fetching profile with username: ${username}`);
            const { data, error } = yield clients_1.supabase
                .from('profiles')
                .select('*')
                .eq('username', username)
                .single();
            if (error) {
                logger_1.default.error(`Error fetching profile by username: ${error.message}`);
                return null;
            }
            return data;
        });
    }
    update(id, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`Updating profile with id: ${id}`);
            const { data, error } = yield clients_1.supabase
                .from('profiles')
                .update(userData)
                .eq('id', id)
                .select()
                .single();
            if (error) {
                logger_1.default.error(`Error updating profile: ${error.message}`);
                return null;
            }
            return data;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`Deleting profile with id: ${id}`);
            const { error } = yield clients_1.supabase.from('profiles').delete().eq('id', id);
            if (error) {
                logger_1.default.error(`Error deleting profile: ${error.message}`);
                return false;
            }
            return true;
        });
    }
}
exports.UsersService = UsersService;
exports.default = new UsersService();
