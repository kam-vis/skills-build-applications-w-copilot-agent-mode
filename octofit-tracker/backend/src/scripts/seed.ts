import mongoose from 'mongoose';

import { Activity, LeaderboardEntry, Team, User, Workout } from '../models';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  console.log('Seed the octofit_db database with test data');

  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      { name: 'Ada Stone', email: 'ada.stone@example.com', fitnessLevel: 'advanced' },
      { name: 'Sam Rivera', email: 'sam.rivera@example.com', fitnessLevel: 'intermediate' },
      { name: 'Priya Shah', email: 'priya.shah@example.com', fitnessLevel: 'beginner' },
    ]);

    const teams = await Team.insertMany([
      { name: 'Trail Blazers', members: 12, sport: 'running' },
      { name: 'Core Crew', members: 9, sport: 'strength training' },
      { name: 'Cycling Collective', members: 7, sport: 'cycling' },
    ]);

    await Activity.insertMany([
      { userId: users[0]._id, type: 'run', durationMinutes: 40, calories: 420, notes: 'Tempo interval run' },
      { userId: users[1]._id, type: 'strength', durationMinutes: 55, calories: 380, notes: 'Upper body circuit' },
      { userId: users[2]._id, type: 'walk', durationMinutes: 30, calories: 180, notes: 'Recovery walk' },
    ]);

    await LeaderboardEntry.insertMany([
      { userId: users[0]._id, name: users[0].name, score: 980 },
      { userId: users[1]._id, name: users[1].name, score: 920 },
      { userId: users[2]._id, name: users[2].name, score: 820 },
    ]);

    await Workout.insertMany([
      { title: 'HIIT Burn', difficulty: 'hard', durationMinutes: 25, focusArea: 'cardio' },
      { title: 'Core Stability Flow', difficulty: 'medium', durationMinutes: 30, focusArea: 'core' },
      { title: 'Mobility Reset', difficulty: 'easy', durationMinutes: 20, focusArea: 'recovery' },
    ]);

    console.log('Database seeding complete');
    console.log(`Created ${users.length} users, ${teams.length} teams, and seed records for activities, leaderboard, and workouts.`);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
