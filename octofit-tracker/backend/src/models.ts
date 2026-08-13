import mongoose, { Schema } from 'mongoose';

export type ResourceName = 'users' | 'teams' | 'activities' | 'leaderboard' | 'workouts';

export type UserRecord = {
  name: string;
  email: string;
  fitnessLevel?: string;
};

export type TeamRecord = {
  name: string;
  members?: number;
  sport?: string;
};

export type ActivityRecord = {
  userId: mongoose.Types.ObjectId | string;
  type: string;
  durationMinutes?: number;
  calories?: number;
  notes?: string;
};

export type LeaderboardRecord = {
  userId: mongoose.Types.ObjectId | string;
  name: string;
  score?: number;
};

export type WorkoutRecord = {
  title: string;
  difficulty?: string;
  durationMinutes?: number;
  focusArea?: string;
};

export type ResourceRecord =
  | UserRecord
  | TeamRecord
  | ActivityRecord
  | LeaderboardRecord
  | WorkoutRecord;

const userSchema = new Schema<UserRecord>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    fitnessLevel: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  },
  { timestamps: true },
);

const teamSchema = new Schema<TeamRecord>(
  {
    name: { type: String, required: true },
    members: { type: Number, default: 0 },
    sport: { type: String, default: 'general fitness' },
  },
  { timestamps: true },
);

const activitySchema = new Schema<ActivityRecord>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, default: 0 },
    calories: { type: Number, default: 0 },
    notes: { type: String, default: '' },
  },
  { timestamps: true },
);

const leaderboardSchema = new Schema<LeaderboardRecord>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    score: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const workoutSchema = new Schema<WorkoutRecord>(
  {
    title: { type: String, required: true },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
    durationMinutes: { type: Number, default: 20 },
    focusArea: { type: String, default: 'full body' },
  },
  { timestamps: true },
);

export const User = mongoose.model('User', userSchema);
export const Team = mongoose.model('Team', teamSchema);
export const Activity = mongoose.model('Activity', activitySchema);
export const LeaderboardEntry = mongoose.model('LeaderboardEntry', leaderboardSchema);
export const Workout = mongoose.model('Workout', workoutSchema);
