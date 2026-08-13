import express, { Express, Request, Response, Router } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import { connectDatabase } from './config/database';
import {
  Activity,
  LeaderboardEntry,
  Team,
  User,
  Workout,
  type ResourceName,
  type ResourceRecord,
} from './models';

const app: Express = express();
const PORT = Number(process.env.PORT || 8000);

const resourceModels = {
  users: User,
  teams: Team,
  activities: Activity,
  leaderboard: LeaderboardEntry,
  workouts: Workout,
} as const;

const defaultSeed: Record<ResourceName, ResourceRecord[]> = {
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

export function getApiBaseUrl(): string {
  const codespaceName = process.env.CODESPACE_NAME;
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${PORT}`;
}

function getRecordIdentifier(record: ResourceRecord): string {
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

function buildRouter(resourceName: ResourceName): Router {
  const router = express.Router();
  const resourceStore = [...defaultSeed[resourceName]];

  router.get('/', async (_req: Request, res: Response) => {
    try {
      if (mongoose.connection.readyState === 1) {
        const model: any = resourceModels[resourceName];
        const documents = await model.find({});
        if (documents.length > 0) {
          return res.json(documents);
        }
      }
    } catch (error) {
      console.warn(`Falling back to in-memory ${resourceName} data.`, error);
    }

    return res.json(resourceStore);
  });

  router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      if (mongoose.connection.readyState === 1) {
        const model: any = resourceModels[resourceName];
        const document = await model.findById(id);
        if (document) {
          return res.json(document);
        }
      }
    } catch (error) {
      console.warn(`Unable to fetch ${resourceName} by id from MongoDB.`, error);
    }

    const resource = resourceStore.find((item) => getRecordIdentifier(item) === String(id));
    if (!resource) {
      return res.status(404).json({ message: `${resourceName.slice(0, -1)} not found` });
    }

    return res.json(resource);
  });

  router.post('/', async (req: Request, res: Response) => {
    const payload = req.body ?? {};
    const record = { ...payload };

    try {
      if (mongoose.connection.readyState === 1) {
        const model: any = resourceModels[resourceName];
        const document = await model.create(record);
        return res.status(201).json(document);
      }
    } catch (error) {
      console.warn(`MongoDB create failed for ${resourceName}. Falling back to in-memory storage.`, error);
    }

    resourceStore.push(record);
    return res.status(201).json(record);
  });

  router.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body ?? {};

    try {
      if (mongoose.connection.readyState === 1) {
        const model: any = resourceModels[resourceName];
        const document = await model.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
        if (document) {
          return res.json(document);
        }
      }
    } catch (error) {
      console.warn(`MongoDB update failed for ${resourceName}.`, error);
    }

    const index = resourceStore.findIndex((item) => getRecordIdentifier(item) === String(id));
    if (index === -1) {
      return res.status(404).json({ message: `${resourceName.slice(0, -1)} not found` });
    }

    resourceStore[index] = { ...resourceStore[index], ...payload };
    return res.json(resourceStore[index]);
  });

  router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      if (mongoose.connection.readyState === 1) {
        const model: any = resourceModels[resourceName];
        const document = await model.findByIdAndDelete(id);
        if (document) {
          return res.json({ message: `${resourceName.slice(0, -1)} deleted`, id });
        }
      }
    } catch (error) {
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

// Configure CORS to allow requests from both Codespaces and localhost
function getCorsOptions() {
  const codespaceName = process.env.CODESPACE_NAME;
  const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:3000',
  ];

  if (codespaceName) {
    allowedOrigins.push(`https://${codespaceName}-5173.app.github.dev`);
  }

  return {
    origin: allowedOrigins,
    credentials: true,
  };
}

app.use(cors(getCorsOptions()));
app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
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
  connectDatabase().finally(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on ${getApiBaseUrl()}`);
    });
  });
}

export default app;
