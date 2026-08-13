# Octofit API Configuration - Codespaces & Localhost Support

## Overview
The Node.js backend API has been successfully configured to support both **GitHub Codespaces** and **localhost** development environments, with automatic detection based on the `CODESPACE_NAME` environment variable.

## Configuration Details

### Backend API Base URL Resolution
- **Codespaces**: `https://{CODESPACE_NAME}-8000.app.github.dev`
- **Localhost**: `http://localhost:8000`

The `getApiBaseUrl()` function in `backend/src/index.ts` automatically detects and returns the appropriate base URL.

### CORS Configuration
The backend includes comprehensive CORS middleware supporting:
- **Codespaces Frontend**: `https://{CODESPACE_NAME}-5173.app.github.dev`
- **Localhost Frontend**: `http://localhost:5173` and `http://127.0.0.1:5173`
- **Alternative Ports**: `http://localhost:3000` and `http://127.0.0.1:3000`

### API Endpoints Verified ✅

#### Root Endpoint
```bash
curl http://localhost:8000/
```
Returns API metadata and list of available routes.

#### Users Endpoint - `/api/users`
```bash
curl http://localhost:8000/api/users
```
Returns list of users from MongoDB with fields:
- `name` (string)
- `email` (string, unique)
- `fitnessLevel` (enum: beginner, intermediate, advanced)
- Timestamps (createdAt, updatedAt)

#### Activities Endpoint - `/api/activities`
```bash
curl http://localhost:8000/api/activities
```
Returns list of activities from MongoDB with fields:
- `userId` (reference to user)
- `type` (string: run, strength, walk, etc.)
- `durationMinutes` (number)
- `calories` (number)
- `notes` (optional string)
- Timestamps (createdAt, updatedAt)

### Frontend API Client
A new API client configuration module is available at `frontend/src/config/api.js` with:

```javascript
// Get the dynamic API base URL
import { API_BASE_URL, api } from './config/api';

// Helper methods for common operations
api.get('/api/users')           // GET request
api.post('/api/users', data)    // POST request
api.put('/api/users/id', data)  // PUT request
api.delete('/api/users/id')     // DELETE request
```

The frontend automatically detects the Codespace environment via the `REACT_APP_CODESPACE_NAME` environment variable.

## Additional Resources

### Other Available Endpoints
- `/api/teams` - Team management
- `/api/leaderboard` - Leaderboard entries
- `/api/workouts` - Workout suggestions

### Database
- MongoDB running on port 27017 (private)
- Database: `octofit_db`
- Mongoose ODM for data access

### Server Configuration
- Backend Port: **8000** (public)
- Frontend Port: **5173** (public)
- MongoDB Port: **27017** (private)

## Testing
All endpoints have been verified working with MongoDB:
```bash
# Test users endpoint
curl http://localhost:8000/api/users | jq .

# Test activities endpoint
curl http://localhost:8000/api/activities | jq .

# Test CORS headers
curl -H "Origin: https://studious-umbrella-4qgqpgrrxrq9h5xj4-5173.app.github.dev" http://localhost:8000/api/users
```

## Environment Variables
For Codespaces deployment:
- `CODESPACE_NAME` - Automatically set by Codespaces (used for dynamic URL)
- `REACT_APP_CODESPACE_NAME` - Same value for frontend (in .env)
- `PORT` - API port (default: 8000)
- `MONGODB_URI` - MongoDB connection string (default: mongodb://localhost:27017/octofit_db)
