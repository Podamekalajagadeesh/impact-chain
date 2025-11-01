import { useReadContract } from 'wagmi'
import { formatEther } from 'viem'
import { IMPACT_CHAIN_ABI, CONTRACT_ADDRESS } from '../config/contract'

function Stats() {
  const { data: totalDonations } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: IMPACT_CHAIN_ABI,
    functionName: 'getTotalDonations',
  })

  const { data: reportCount } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: IMPACT_CHAIN_ABI,
    functionName: 'getReportCount',
  })

  const { data: donations } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: IMPACT_CHAIN_ABI,
    functionName: 'getDonations',
  })

  return (
    <div className="stats">
      <div className="stat-item">
        <span className="stat-value">
          {totalDonations ? formatEther(totalDonations as bigint) : '0'} ETH
        </span>
        <span className="stat-label">Total Donations</span>
      </div>

      <div className="stat-item">
        <span className="stat-value">{donations ? donations.length : 0}</span>
        <span className="stat-label">Donors</span>
      </div>

      <div className="stat-item">
        <span className="stat-value">{reportCount ? reportCount.toString() : '0'}</span>
        <span className="stat-label">Impact Reports</span>
      </div>
    </div>
  )
}

export default Stats
