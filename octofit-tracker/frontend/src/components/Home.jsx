import React from 'react'

function Home() {
  return (
    <div className="text-center py-5">
      <h1 className="display-4 mb-4">🏋️ Welcome to Octofit Tracker</h1>
      <p className="lead mb-5">
        Track your fitness activities, compete on leaderboards, and achieve your goals!
      </p>

      <div className="row g-4 justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <h5 className="card-title">👥 Users</h5>
              <p className="card-text">
                Manage your fitness profile and view other members
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <h5 className="card-title">📊 Activities</h5>
              <p className="card-text">
                Log and track your daily workouts and exercises
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <h5 className="card-title">🏆 Leaderboard</h5>
              <p className="card-text">
                Compete with others and climb the rankings
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <h5 className="card-title">👫 Teams</h5>
              <p className="card-text">
                Join teams and collaborate with other fitness enthusiasts
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <h5 className="card-title">💪 Workouts</h5>
              <p className="card-text">
                Discover personalized workout programs for your goals
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 pt-5">
        <p className="text-muted">
          Start exploring by selecting a section from the navigation menu above.
        </p>
      </div>
    </div>
  )
}

export default Home
