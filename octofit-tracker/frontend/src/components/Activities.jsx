import React, { useState, useEffect } from 'react'
import { api, normalizeResponse } from '../config/apiConfig'

function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchActivities()
  }, [])

  const fetchActivities = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await api.get('/api/activities')
      const normalized = normalizeResponse(data)
      setActivities(normalized)
    } catch (err) {
      setError(err.message)
      console.error('Failed to fetch activities:', err)
    } finally {
      setLoading(false)
    }
  }

  const getActivityBadge = (type) => {
    const variants = {
      run: 'info',
      walk: 'secondary',
      strength: 'warning',
      cardio: 'danger',
      yoga: 'success',
      cycling: 'primary',
    }
    return variants[type] || 'secondary'
  }

  const getTotalStats = () => {
    return activities.reduce(
      (acc, activity) => ({
        count: acc.count + 1,
        duration: acc.duration + (activity.durationMinutes || 0),
        calories: acc.calories + (activity.calories || 0),
      }),
      { count: 0, duration: 0, calories: 0 }
    )
  }

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading activities...</p>
      </div>
    )
  }

  const stats = getTotalStats()

  return (
    <div>
      <h1 className="mb-4">📊 Activities</h1>

      {error && (
        <div className="alert alert-danger" role="alert">
          <strong>Error:</strong> {error}
        </div>
      )}

      {activities.length > 0 && (
        <div className="stats-grid mb-4">
          <div className="stat-card">
            <div className="stat-number">{stats.count}</div>
            <div className="stat-label">Total Activities</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.duration}</div>
            <div className="stat-label">Minutes Exercised</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.calories}</div>
            <div className="stat-label">Calories Burned</div>
          </div>
        </div>
      )}

      <div className="mb-3">
        <button className="btn btn-primary" onClick={fetchActivities} disabled={loading}>
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {activities.length === 0 ? (
        <div className="alert alert-info">No activities found.</div>
      ) : (
        <div className="row g-3">
          {activities.map((activity) => (
            <div key={activity._id} className="col-md-6 col-lg-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">
                    <span
                      className={`badge bg-${getActivityBadge(
                        activity.type
                      )} me-2`}
                    >
                      {activity.type}
                    </span>
                  </h5>
                  {activity.notes && (
                    <p className="card-text text-muted">{activity.notes}</p>
                  )}
                  <div className="d-grid gap-2 text-sm">
                    <small>
                      <strong>Duration:</strong> {activity.durationMinutes} min
                    </small>
                    <small>
                      <strong>Calories:</strong> {activity.calories}
                    </small>
                    {activity.createdAt && (
                      <small className="text-muted">
                        {new Date(activity.createdAt).toLocaleDateString()}
                      </small>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 text-muted">
        <small>Total activities: {activities.length}</small>
      </div>
    </div>
  )
}

export default Activities
