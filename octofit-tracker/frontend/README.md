# Octofit Tracker - React 19 Frontend

A modern React 19 presentation tier for the Octofit Tracker multi-tier fitness application.

## Features

- **React 19** with hooks for state management
- **Vite** for fast development and optimized builds
- **Bootstrap 5** for responsive UI components
- **react-router-dom** for client-side navigation
- **Dynamic API URL resolution** for Codespaces and localhost
- **Responsive design** for mobile and desktop
- **Component-based architecture** for reusability

## Setup

### Prerequisites

- Node.js (LTS recommended)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
```

### Environment Configuration

Create a `.env.local` file in the frontend directory:

```bash
# For Codespaces deployment
VITE_CODESPACE_NAME=your-codespace-name

# For localhost development (leave empty)
# VITE_CODESPACE_NAME=
```

To find your Codespace name:
1. Check the URL in your browser (it's before `.app.github.dev`)
2. Or run: `echo $CODESPACE_NAME` in the terminal

### Development

```bash
# Start development server
npm run dev

# The app will be available at http://localhost:5173
```

### Build

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

### Linting

```bash
# Run ESLint
npm run lint
```

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Home.jsx           # Landing page
│   │   ├── Users.jsx          # User management
│   │   ├── Activities.jsx     # Activity tracking
│   │   ├── Teams.jsx          # Team management
│   │   ├── Leaderboard.jsx    # Competitive rankings
│   │   └── Workouts.jsx       # Workout programs
│   ├── config/
│   │   └── apiConfig.js       # API client with Vite env support
│   ├── App.jsx                # Main app with routing
│   ├── App.css                # App styling
│   ├── main.jsx               # Entry point with Bootstrap
│   └── index.css              # Global styles
├── index.html                 # HTML template
├── vite.config.js            # Vite configuration
├── .env.local                 # Environment variables
├── package.json              # Dependencies and scripts
└── .eslintrc.cjs             # ESLint configuration
```

## API Integration

The frontend connects to the Octofit API endpoints:

- `/api/users` - User profiles and management
- `/api/activities` - Workout activity tracking
- `/api/teams` - Team management
- `/api/leaderboard` - Competitive rankings
- `/api/workouts` - Workout programs and suggestions

### API URL Resolution

The `apiConfig.js` module automatically determines the API base URL:

**Codespaces:**
```
https://{VITE_CODESPACE_NAME}-8000.app.github.dev
```

**Localhost (development):**
```
http://localhost:8000
```

### Using the API Client

```javascript
import { api, normalizeResponse } from './config/apiConfig'

// GET request
const users = await api.get('/api/users')

// POST request
const newUser = await api.post('/api/users', { name: 'John', email: 'john@example.com' })

// Response normalization (handles both array and paginated responses)
const normalized = normalizeResponse(data)
```

## Components

### Users
Displays a list of fitness profiles with fitness levels (beginner, intermediate, advanced).

### Activities
Shows logged workouts with duration, calories burned, and activity type.

### Teams
Manages team creation and membership for group fitness activities.

### Leaderboard
Competitive ranking system with medals for top performers.

### Workouts
Personalized workout programs filtered by difficulty and focus area.

## Styling

- **Bootstrap 5** for responsive grid and components
- **Custom CSS** for dark theme and Octofit branding
- **CSS Grid** for flexible layouts
- Mobile-first responsive design

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### API Connection Issues

1. Check that `VITE_CODESPACE_NAME` is set correctly in `.env.local`
2. Verify the backend API is running on port 8000
3. Check browser console for detailed error messages
4. Ensure CORS is properly configured on the backend

### Development Server Issues

1. Clear node_modules and reinstall: `rm -rf node_modules && npm install`
2. Clear Vite cache: `rm -rf node_modules/.vite`
3. Check that port 5173 is available

## Contributing

Follow the component structure and use the API client module for all backend communication.

## License

ISC
