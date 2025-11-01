import { useState, useEffect } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import DonationForm from './components/DonationForm'
import ImpactReportForm from './components/ImpactReportForm'
import ImpactReports from './components/ImpactReports'
import Stats from './components/Stats'
import Leaderboard from './components/Leaderboard'
import ActivityFeed from './components/ActivityFeed'
import ProgressGoal from './components/ProgressGoal'

function App() {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const [darkMode, setDarkMode] = useState(true) // Set dark mode as default
  const [showScrollTop, setShowScrollTop] = useState(false)

  // Apply dark mode on initial load
  useEffect(() => {
    document.body.classList.add('dark-mode')
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.body.classList.toggle('dark-mode')
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Show scroll to top button when scrolled down
  if (typeof window !== 'undefined') {
    window.onscroll = () => {
      setShowScrollTop(window.pageYOffset > 300)
    }
  }

  return (
    <>
      <div className="header">
        <h1>
          <svg className="globe-icon" width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="url(#globe-gradient)" strokeWidth="2"/>
            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="url(#globe-gradient)" strokeWidth="2"/>
            <defs>
              <linearGradient id="globe-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00d4ff" />
                <stop offset="100%" stopColor="#0066ff" />
              </linearGradient>
            </defs>
          </svg>
          Impact Chain
        </h1>
        <p>Transparent Donations & Verifiable Impact Tracking</p>
      </div>

      <div className="wallet-connect">
        <button className="theme-toggle" onClick={toggleDarkMode}>
          {darkMode ? '☀️' : '🌙'}
        </button>
        {isConnected ? (
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <span style={{ color: 'white', fontSize: '0.9rem' }}>
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </span>
            <button className="btn btn-secondary" onClick={() => disconnect()}>
              Disconnect
            </button>
          </div>
        ) : (
          <button
            className="btn btn-primary"
            onClick={() => connect({ connector: connectors[0] })}
          >
            Connect Wallet
          </button>
        )}
      </div>

      {isConnected ? (
        <>
          <Stats />
          
          <ProgressGoal />

          <div className="grid">
            <div className="container">
              <h2>💝 Make a Donation</h2>
              <DonationForm />
            </div>

            <div className="container">
              <h2>📝 Submit Impact Report</h2>
              <ImpactReportForm />
            </div>
          </div>

          <div className="grid">
            <div className="container">
              <h2>🏆 Top Donors</h2>
              <Leaderboard />
            </div>

            <div className="container">
              <h2>⚡ Recent Activity</h2>
              <ActivityFeed />
            </div>
          </div>

          <div className="container">
            <h2>📊 Impact Reports</h2>
            <ImpactReports />
          </div>

          {showScrollTop && (
            <button className="floating-action" onClick={scrollToTop}>
              ↑
            </button>
          )}
        </>
      ) : (
        <div className="container">
          <h2 style={{ textAlign: 'center', color: '#6b7280', marginBottom: '1rem' }}>
            Welcome to Impact Chain! 👋
          </h2>
          <p style={{ textAlign: 'center', color: '#6b7280', lineHeight: '1.6' }}>
            Connect your wallet to start making a difference. Track donations transparently,
            submit impact reports, and see the real-world change your contributions create.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '2rem', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>💝</div>
              <div style={{ fontWeight: '600', color: '#667eea' }}>Donate Securely</div>
              <div style={{ fontSize: '0.9rem', color: '#6b7280', marginTop: '0.25rem' }}>
                Blockchain transparency
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📊</div>
              <div style={{ fontWeight: '600', color: '#667eea' }}>Track Impact</div>
              <div style={{ fontSize: '0.9rem', color: '#6b7280', marginTop: '0.25rem' }}>
                Verifiable results
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🏆</div>
              <div style={{ fontWeight: '600', color: '#667eea' }}>Join Community</div>
              <div style={{ fontSize: '0.9rem', color: '#6b7280', marginTop: '0.25rem' }}>
                Be a top donor
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default App
