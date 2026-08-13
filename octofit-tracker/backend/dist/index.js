"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApiBaseUrl = getApiBaseUrl;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const database_1 = require("./config/database");
const models_1 = require("./models");
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT || 8000);
const resourceModels = {
    users: models_1.User,
    teams: models_1.Team,
    activities: models_1.Activity,
    leaderboard: models_1.LeaderboardEntry,
    workouts: models_1.Workout,
};
const defaultSeed = {
    users: [
        { name: 'Ada Stone', email: 'ada.stone@example.com', fitnessLevel: 'advanced' },
        { name: 'Sam Rivera', email: 'sam.rivera@example.com', fitnessLevel: 'intermediate' },
    ],
    teams: [
        { name: 'Trail Blazers', members: 12, sport: 'running' },
        { name: 'Core Crew', members: 9, sport: 'strength training' },
    ],
    activities: [
        { userId: '64c0f5e6e6fcb9d1d5e7c99a', type: 'run', durationMinutes: 40, calories: 420, notes: 'Tempo interval run' },
        { userId: '64c0f5e6e6fcb9d1d5e7c99b', type: 'strength', durationMinutes: 55, calories: 380, notes: 'Upper body circuit' },
    ],
    leaderboard: [
        { userId: '64c0f5e6e6fcb9d1d5e7c99a', name: 'Ada Stone', score: 980 },
        { userId: '64c0f5e6e6fcb9d1d5e7c99b', name: 'Sam Rivera', score: 920 },
    ],
    workouts: [
        { title: 'HIIT Burn', difficulty: 'hard', durationMinutes: 25, focusArea: 'cardio' },
        { title: 'Mobility Reset', difficulty: 'easy', durationMinutes: 20, focusArea: 'recovery' },
    ],
};
function getApiBaseUrl() {
    const codespaceName = process.env.CODESPACE_NAME;
    return codespaceName
        ? `https://${codespaceName}-8000.app.github.dev`
        : `http://localhost:${PORT}`;
}
function getRecordIdentifier(record) {
    if ('name' in record && typeof record.name === 'string' && 'email' in record) {
        return record.email;
    }
    if ('title' in record && typeof record.title === 'string') {
        return record.title;
    }
    if ('userId' in record && 'type' in record) {
        return `${String(record.userId)}:${record.type}`;
    }
    if ('userId' in record && 'name' in record) {
        return `${String(record.userId)}:${record.name}`;
    }
    return JSON.stringify(record);
}
function buildRouter(resourceName) {
    const router = express_1.default.Router();
    const resourceStore = [...defaultSeed[resourceName]];
    router.get('/', async (_req, res) => {
        try {
            if (mongoose_1.default.connection.readyState === 1) {
                const model = resourceModels[resourceName];
                const documents = await model.find({});
                if (documents.length > 0) {
                    return res.json(documents);
                }
            }
        }
        catch (error) {
            console.warn(`Falling back to in-memory ${resourceName} data.`, error);
        }
        return res.json(resourceStore);
    });
    router.get('/:id', async (req, res) => {
        const { id } = req.params;
        try {
            if (mongoose_1.default.connection.readyState === 1) {
                const model = resourceModels[resourceName];
                const document = await model.findById(id);
                if (document) {
                    return res.json(document);
                }
            }
        }
        catch (error) {
            console.warn(`Unable to fetch ${resourceName} by id from MongoDB.`, error);
        }
        const resource = resourceStore.find((item) => getRecordIdentifier(item) === String(id));
        if (!resource) {
            return res.status(404).json({ message: `${resourceName.slice(0, -1)} not found` });
        }
        return res.json(resource);
    });
    router.post('/', async (req, res) => {
        const payload = req.body ?? {};
        const record = { ...payload };
        try {
            if (mongoose_1.default.connection.readyState === 1) {
                const model = resourceModels[resourceName];
                const document = await model.create(record);
                return res.status(201).json(document);
            }
        }
        catch (error) {
            console.warn(`MongoDB create failed for ${resourceName}. Falling back to in-memory storage.`, error);
        }
        resourceStore.push(record);
        return res.status(201).json(record);
    });
    router.put('/:id', async (req, res) => {
        const { id } = req.params;
        const payload = req.body ?? {};
        try {
            if (mongoose_1.default.connection.readyState === 1) {
                const model = resourceModels[resourceName];
                const document = await model.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
                if (document) {
                    return res.json(document);
                }
            }
        }
        catch (error) {
            console.warn(`MongoDB update failed for ${resourceName}.`, error);
        }
        const index = resourceStore.findIndex((item) => getRecordIdentifier(item) === String(id));
        if (index === -1) {
            return res.status(404).json({ message: `${resourceName.slice(0, -1)} not found` });
        }
        resourceStore[index] = { ...resourceStore[index], ...payload };
        return res.json(resourceStore[index]);
    });
    router.delete('/:id', async (req, res) => {
        const { id } = req.params;
        try {
            if (mongoose_1.default.connection.readyState === 1) {
                const model = resourceModels[resourceName];
                const document = await model.findByIdAndDelete(id);
                if (document) {
                    return res.json({ message: `${resourceName.slice(0, -1)} deleted`, id });
                }
            }
        }
        catch (error) {
            console.warn(`MongoDB delete failed for ${resourceName}.`, error);
        }
        const index = resourceStore.findIndex((item) => getRecordIdentifier(item) === String(id));
        if (index === -1) {
            return res.status(404).json({ message: `${resourceName.slice(0, -1)} not found` });
        }
        const [deleted] = resourceStore.splice(index, 1);
        return res.json({ message: `${resourceName.slice(0, -1)} deleted`, id: getRecordIdentifier(deleted) });
    });
    return router;
}
app.use(express_1.default.json());
app.get('/', (_req, res) => {
    res.json({
        message: 'Octofit Tracker API',
        apiBaseUrl: getApiBaseUrl(),
        routes: ['/api/users/', '/api/teams/', '/api/activities/', '/api/leaderboard/', '/api/workouts/'],
    });
});
app.use('/api/users', buildRouter('users'));
app.use('/api/teams', buildRouter('teams'));
app.use('/api/activities', buildRouter('activities'));
app.use('/api/leaderboard', buildRouter('leaderboard'));
app.use('/api/workouts', buildRouter('workouts'));
if (require.main === module) {
    (0, database_1.connectDatabase)().finally(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on ${getApiBaseUrl()}`);
        });
    });
}
exports.default = app;
//# sourceMappingURL=index.js.map