import { useReadContract } from 'wagmi'
import { formatEther } from 'viem'
import { IMPACT_CHAIN_ABI, CONTRACT_ADDRESS } from '../config/contract'

interface Donation {
  donor: string
  amount: bigint
  timestamp: bigint
  isAnonymous: boolean
}

interface ImpactReport {
  reporter: string
  description: string
  imageUrl: string
  timestamp: bigint
  upvotes: bigint
  downvotes: bigint
  verified: boolean
  aiVerified: boolean
}

function ActivityFeed() {
  const { data: donations } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: IMPACT_CHAIN_ABI,
    functionName: 'getDonations',
  })

  const { data: reports } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: IMPACT_CHAIN_ABI,
    functionName: 'getImpactReports',
  })

  const getTimeAgo = (timestamp: bigint) => {
    const seconds = Math.floor(Date.now() / 1000 - Number(timestamp))
    
    if (seconds < 60) return 'Just now'
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
    return `${Math.floor(seconds / 86400)}d ago`
  }

  const getActivities = () => {
    const activities: any[] = []
    
    if (donations) {
      (donations as Donation[]).forEach((donation, index) => {
        activities.push({
          type: 'donation',
          timestamp: donation.timestamp,
          data: donation,
          id: `donation-${index}`
        })
      })
    }
    
    if (reports) {
      (reports as ImpactReport[]).forEach((report, index) => {
        activities.push({
          type: 'report',
          timestamp: report.timestamp,
          data: report,
          id: `report-${index}`
        })
      })
    }
    
    return activities
      .sort((a, b) => Number(b.timestamp - a.timestamp))
      .slice(0, 10)
  }

  const activities = getActivities()

  if (activities.length === 0) {
    return (
      <div className="loading">
        <p>No activity yet</p>
      </div>
    )
  }

  return (
    <div className="activity-feed">
      {activities.map((activity) => (
        <div key={activity.id} className="activity-item">
          <div className="activity-icon">
            {activity.type === 'donation' ? '��' : '📝'}
          </div>
          <div className="activity-content">
            <div className="activity-text">
              {activity.type === 'donation' ? (
                activity.data.isAnonymous ? (
                  <>
                    <strong>Anonymous</strong> donated{' '}
                    <strong>{formatEther(activity.data.amount)} ETH</strong>
                  </>
                ) : (
                  <>
                    <strong>
                      {activity.data.donor.slice(0, 6)}...{activity.data.donor.slice(-4)}
                    </strong>{' '}
                    donated <strong>{formatEther(activity.data.amount)} ETH</strong>
                  </>
                )
              ) : (
                <>
                  <strong>
                    {activity.data.reporter.slice(0, 6)}...{activity.data.reporter.slice(-4)}
                  </strong>{' '}
                  submitted an impact report
                </>
              )}
            </div>
            <div className="activity-time">
              {getTimeAgo(activity.timestamp)}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ActivityFeed
