import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { getApiBaseUrl } from './config/apiConfig'
import Users from './components/Users'
import Activities from './components/Activities'
import Teams from './components/Teams'
import Leaderboard from './components/Leaderboard'
import Workouts from './components/Workouts'
import Home from './components/Home'
import './App.css'

function App() {
  const apiBaseUrl = getApiBaseUrl()
  const isLocalhost = apiBaseUrl.includes('localhost')

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark sticky-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <span>🏋️</span>
            <span>Octofit Tracker</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/users">
                  Users
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/activities">
                  Activities
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/teams">
                  Teams
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/leaderboard">
                  Leaderboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/workouts">
                  Workouts
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container-main">
        {!isLocalhost && (
          <div className="alert alert-info" role="alert">
            <strong>ℹ️ Codespaces Mode:</strong> Connected to{' '}
            <code>{apiBaseUrl}</code>
          </div>
        )}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </div>

      <footer className="text-center py-4 mt-5 border-top border-secondary">
        <small className="text-muted">
          Octofit Tracker • Built with React 19 & Express.js
        </small>
      </footer>
    </Router>
  )
}

export default App
