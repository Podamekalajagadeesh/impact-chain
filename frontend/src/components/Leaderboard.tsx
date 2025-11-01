import { useReadContract } from 'wagmi'
import { formatEther } from 'viem'
import { IMPACT_CHAIN_ABI, CONTRACT_ADDRESS } from '../config/contract'

interface Donation {
  donor: string
  amount: bigint
  timestamp: bigint
  isAnonymous: boolean
}

function Leaderboard() {
  const { data: donations } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: IMPACT_CHAIN_ABI,
    functionName: 'getDonations',
  })

  // Aggregate donations by donor
  const getLeaderboard = () => {
    if (!donations) return []
    
    const donorMap = new Map<string, bigint>()
    
    ;(donations as Donation[]).forEach((donation) => {
      if (!donation.isAnonymous) {
        const current = donorMap.get(donation.donor) || BigInt(0)
        donorMap.set(donation.donor, current + donation.amount)
      }
    })
    
    return Array.from(donorMap.entries())
      .map(([address, amount]) => ({ address, amount }))
      .sort((a, b) => Number(b.amount - a.amount))
      .slice(0, 10)
  }

  const leaderboard = getLeaderboard()

  const getRankClass = (index: number) => {
    if (index === 0) return 'gold'
    if (index === 1) return 'silver'
    if (index === 2) return 'bronze'
    return ''
  }

  const getRankEmoji = (index: number) => {
    if (index === 0) return '🥇'
    if (index === 1) return '🥈'
    if (index === 2) return '🥉'
    return `#${index + 1}`
  }

  if (leaderboard.length === 0) {
    return (
      <div className="loading">
        <p>No donations yet. Be the first to donate!</p>
      </div>
    )
  }

  return (
    <div className="leaderboard">
      {leaderboard.map((donor, index) => (
        <div key={donor.address} className="leaderboard-item">
          <div className={`leaderboard-rank ${getRankClass(index)}`}>
            {getRankEmoji(index)}
          </div>
          <div className="leaderboard-info">
            <div className="leaderboard-address">
              {donor.address.slice(0, 6)}...{donor.address.slice(-4)}
            </div>
          </div>
          <div className="leaderboard-amount">
            {formatEther(donor.amount)} ETH
          </div>
        </div>
      ))}
    </div>
  )
}

export default Leaderboard
