"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionString = void 0;
exports.connectDatabase = connectDatabase;
const mongoose_1 = __importDefault(require("mongoose"));
exports.connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
async function connectDatabase() {
    try {
        await mongoose_1.default.connect(exports.connectionString);
        console.log('Connected to octofit_db');
        return mongoose_1.default;
    }
    catch (error) {
        console.warn('MongoDB connection unavailable; continuing without a database connection.', error);
        return mongoose_1.default;
    }
}
mongoose_1.default.connection.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});
exports.default = connectDatabase;
//# sourceMappingURL=database.js.map