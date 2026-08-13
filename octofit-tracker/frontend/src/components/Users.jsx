import React, { useState, useEffect } from 'react'
import { normalizeResponse } from '../config/apiConfig'

// Codespaces-aware API endpoint with localhost fallback
const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const API_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(API_URL)
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`)
      }
      const data = await response.json()
      const normalized = normalizeResponse(data)
      setUsers(normalized)
    } catch (err) {
      setError(err.message)
      console.error('Failed to fetch users:', err)
    } finally {
      setLoading(false)
    }
  }

  const getFitnessLevelBadge = (level) => {
    const variants = {
      beginner: 'primary',
      intermediate: 'warning',
      advanced: 'success',
    }
    return variants[level] || 'secondary'
  }

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading users...</p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="mb-4">👥 Users</h1>

      {error && (
        <div className="alert alert-danger" role="alert">
          <strong>Error:</strong> {error}
        </div>
      )}

      <div className="mb-3">
        <button className="btn btn-primary" onClick={fetchUsers} disabled={loading}>
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {users.length === 0 ? (
        <div className="alert alert-info">No users found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Fitness Level</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id || user.email}>
                  <td className="fw-bold">{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span
                      className={`badge bg-${getFitnessLevelBadge(
                        user.fitnessLevel
                      )}`}
                    >
                      {user.fitnessLevel || 'Unknown'}
                    </span>
                  </td>
                  <td className="text-muted">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-4 text-muted">
        <small>Total users: {users.length}</small>
      </div>
    </div>
  )
}

export default Users
