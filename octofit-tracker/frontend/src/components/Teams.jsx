import React, { useState, useEffect } from 'react'
import { api, normalizeResponse } from '../config/apiConfig'

function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchTeams()
  }, [])

  const fetchTeams = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await api.get('/api/teams')
      const normalized = normalizeResponse(data)
      setTeams(normalized)
    } catch (err) {
      setError(err.message)
      console.error('Failed to fetch teams:', err)
    } finally {
      setLoading(false)
    }
  }

  const getSportBadge = (sport) => {
    const variants = {
      running: 'primary',
      cycling: 'info',
      swimming: 'success',
      'strength training': 'warning',
      yoga: 'secondary',
    }
    return variants[sport?.toLowerCase()] || 'secondary'
  }

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading teams...</p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="mb-4">👫 Teams</h1>

      {error && (
        <div className="alert alert-danger" role="alert">
          <strong>Error:</strong> {error}
        </div>
      )}

      <div className="mb-3">
        <button className="btn btn-primary" onClick={fetchTeams} disabled={loading}>
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {teams.length === 0 ? (
        <div className="alert alert-info">No teams found.</div>
      ) : (
        <div className="row g-3">
          {teams.map((team) => (
            <div key={team._id} className="col-md-6 col-lg-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{team.name}</h5>
                  <p className="card-text">
                    <span
                      className={`badge bg-${getSportBadge(team.sport)}`}
                    >
                      {team.sport}
                    </span>
                  </p>
                  <div className="d-grid gap-2 text-sm">
                    <small>
                      <strong>Members:</strong> {team.members}
                    </small>
                    {team.createdAt && (
                      <small className="text-muted">
                        Created:{' '}
                        {new Date(team.createdAt).toLocaleDateString()}
                      </small>
                    )}
                  </div>
                </div>
                <div className="card-footer bg-transparent border-top border-secondary">
                  <button className="btn btn-sm btn-outline-primary w-100">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 text-muted">
        <small>Total teams: {teams.length}</small>
      </div>
    </div>
  )
}

export default Teams
