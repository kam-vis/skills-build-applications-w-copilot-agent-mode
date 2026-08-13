import mongoose from 'mongoose';

export const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

export async function connectDatabase(): Promise<typeof mongoose> {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');
    return mongoose;
  } catch (error) {
    console.warn('MongoDB connection unavailable; continuing without a database connection.', error);
    return mongoose;
  }
}

mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

export default connectDatabase;
