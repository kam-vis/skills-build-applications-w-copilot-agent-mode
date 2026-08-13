import React, { useState, useEffect } from 'react'
import { normalizeResponse } from '../config/apiConfig'

// Codespaces-aware API endpoint with localhost fallback
const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const API_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchWorkouts()
  }, [])

  const fetchWorkouts = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(API_URL)
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`)
      }
      const data = await response.json()
      const normalized = normalizeResponse(data)
      setWorkouts(normalized)
    } catch (err) {
      setError(err.message)
      console.error('Failed to fetch workouts:', err)
    } finally {
      setLoading(false)
    }
  }

  const getDifficultyBadge = (difficulty) => {
    const variants = {
      easy: 'success',
      medium: 'warning',
      hard: 'danger',
    }
    return variants[difficulty?.toLowerCase()] || 'secondary'
  }

  const getFocusAreaIcon = (area) => {
    const icons = {
      cardio: '🏃',
      strength: '💪',
      flexibility: '🧘',
      recovery: '😌',
      balance: '⚖️',
      endurance: '🏅',
    }
    return icons[area?.toLowerCase()] || '💥'
  }

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading workouts...</p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="mb-4">💪 Workouts</h1>

      {error && (
        <div className="alert alert-danger" role="alert">
          <strong>Error:</strong> {error}
        </div>
      )}

      <div className="mb-3">
        <button className="btn btn-primary" onClick={fetchWorkouts} disabled={loading}>
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {workouts.length === 0 ? (
        <div className="alert alert-info">No workouts found.</div>
      ) : (
        <div className="row g-3">
          {workouts.map((workout) => (
            <div key={workout._id} className="col-md-6 col-lg-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{workout.title}</h5>
                  <p className="card-text mb-3">
                    <span
                      className={`badge bg-${getDifficultyBadge(
                        workout.difficulty
                      )}`}
                    >
                      {workout.difficulty}
                    </span>
                  </p>
                  <div className="d-grid gap-2 text-sm">
                    <small>
                      <strong>Duration:</strong> {workout.durationMinutes} min
                    </small>
                    <small>
                      <strong>Focus Area:</strong>{' '}
                      {getFocusAreaIcon(workout.focusArea)} {workout.focusArea}
                    </small>
                    {workout.createdAt && (
                      <small className="text-muted">
                        Added:{' '}
                        {new Date(workout.createdAt).toLocaleDateString()}
                      </small>
                    )}
                  </div>
                </div>
                <div className="card-footer bg-transparent border-top border-secondary">
                  <button className="btn btn-sm btn-outline-primary w-100">
                    Start Workout
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 text-muted">
        <small>Total workouts: {workouts.length}</small>
      </div>
    </div>
  )
}

export default Workouts
