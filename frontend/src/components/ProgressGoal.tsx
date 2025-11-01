import { useReadContract } from 'wagmi'
import { formatEther } from 'viem'
import { IMPACT_CHAIN_ABI, CONTRACT_ADDRESS } from '../config/contract'

function ProgressGoal() {
  const { data: totalDonations } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: IMPACT_CHAIN_ABI,
    functionName: 'getTotalDonations',
  })

  const goal = 10 // 10 ETH goal
  const current = totalDonations ? parseFloat(formatEther(totalDonations as bigint)) : 0
  const percentage = Math.min((current / goal) * 100, 100)

  const milestones = [
    { amount: 1, emoji: '🌱', message: 'First milestone reached!' },
    { amount: 5, emoji: '🌿', message: 'Halfway to our goal!' },
    { amount: 10, emoji: '🌳', message: 'Goal achieved! Amazing!' }
  ]

  const recentMilestone = milestones
    .filter(m => current >= m.amount)
    .sort((a, b) => b.amount - a.amount)[0]

  return (
    <div>
      {recentMilestone && current < goal * 1.1 && (
        <div className="milestone-banner">
          {recentMilestone.emoji} {recentMilestone.message}
        </div>
      )}
      
      <div className="progress-bar-container">
        <div className="progress-bar-header">
          <span className="progress-bar-title">
            🎯 Community Goal Progress
          </span>
          <span className="progress-bar-value">
            {current.toFixed(4)} / {goal} ETH
          </span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div style={{ textAlign: 'center', marginTop: '0.5rem', fontSize: '0.9rem', color: '#6b7280' }}>
          {percentage.toFixed(1)}% Complete
        </div>
      </div>
    </div>
  )
}

export default ProgressGoal
