import mongoose, { Schema, Document } from 'mongoose';

// Type definitions
export type ResourceName = 'users' | 'teams' | 'activities' | 'leaderboard' | 'workouts';

export interface ResourceRecord {
  [key: string]: any;
}

export interface UserRecord extends ResourceRecord {
  name: string;
  email: string;
  fitnessLevel?: 'beginner' | 'intermediate' | 'advanced';
}

export interface TeamRecord extends ResourceRecord {
  name: string;
  members: number;
  sport: string;
}

export interface ActivityRecord extends ResourceRecord {
  userId: string;
  type: string;
  durationMinutes: number;
  calories: number;
  notes?: string;
}

export interface LeaderboardEntryRecord extends ResourceRecord {
  userId: string;
  name: string;
  score: number;
}

export interface WorkoutRecord extends ResourceRecord {
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  durationMinutes: number;
  focusArea: string;
}

// Mongoose Schemas
const userSchema = new Schema<UserRecord>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  fitnessLevel: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
}, { timestamps: true });

const teamSchema = new Schema<TeamRecord>({
  name: { type: String, required: true },
  members: { type: Number, required: true },
  sport: { type: String, required: true },
}, { timestamps: true });

const activitySchema = new Schema<ActivityRecord>({
  userId: { type: String, required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  calories: { type: Number, required: true },
  notes: String,
}, { timestamps: true });

const leaderboardSchema = new Schema<LeaderboardEntryRecord>({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  score: { type: Number, required: true },
}, { timestamps: true });

const workoutSchema = new Schema<WorkoutRecord>({
  title: { type: String, required: true },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
  durationMinutes: { type: Number, required: true },
  focusArea: { type: String, required: true },
}, { timestamps: true });

// Mongoose Models
export const User = mongoose.model('User', userSchema);
export const Team = mongoose.model('Team', teamSchema);
export const Activity = mongoose.model('Activity', activitySchema);
export const LeaderboardEntry = mongoose.model('LeaderboardEntry', leaderboardSchema);
export const Workout = mongoose.model('Workout', workoutSchema);
