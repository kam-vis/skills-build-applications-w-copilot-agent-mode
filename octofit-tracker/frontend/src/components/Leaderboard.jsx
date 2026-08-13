import React, { useState, useEffect } from 'react'
import { api, normalizeResponse } from '../config/apiConfig'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchLeaderboard()
  }, [])

  const fetchLeaderboard = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await api.get('/api/leaderboard')
      const normalized = normalizeResponse(data)
      // Sort by score descending
      const sorted = [...normalized].sort((a, b) => (b.score || 0) - (a.score || 0))
      setEntries(sorted)
    } catch (err) {
      setError(err.message)
      console.error('Failed to fetch leaderboard:', err)
    } finally {
      setLoading(false)
    }
  }

  const getMedalEmoji = (rank) => {
    switch (rank) {
      case 1:
        return '🥇'
      case 2:
        return '🥈'
      case 3:
        return '🥉'
      default:
        return '•'
    }
  }

  const getRankBadgeVariant = (rank) => {
    if (rank === 1) return 'warning'
    if (rank === 2) return 'secondary'
    if (rank === 3) return 'danger'
    return 'primary'
  }

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading leaderboard...</p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="mb-4">🏆 Leaderboard</h1>

      {error && (
        <div className="alert alert-danger" role="alert">
          <strong>Error:</strong> {error}
        </div>
      )}

      <div className="mb-3">
        <button className="btn btn-primary" onClick={fetchLeaderboard} disabled={loading}>
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {entries.length === 0 ? (
        <div className="alert alert-info">No leaderboard entries found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th style={{ width: '80px' }}>Rank</th>
                <th>Name</th>
                <th style={{ width: '150px', textAlign: 'right' }}>
                  Score
                </th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => {
                const rank = index + 1
                return (
                  <tr key={entry._id || entry.userId}>
                    <td>
                      <span
                        className={`badge bg-${getRankBadgeVariant(rank)}`}
                      >
                        {getMedalEmoji(rank)} #{rank}
                      </span>
                    </td>
                    <td className="fw-bold">{entry.name}</td>
                    <td style={{ textAlign: 'right' }}>
                      <strong>{entry.score}</strong>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-4 text-muted">
        <small>Total participants: {entries.length}</small>
      </div>
    </div>
  )
}

export default Leaderboard
