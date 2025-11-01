import { useState } from 'react'
import { useReadContract, useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi'
import { IMPACT_CHAIN_ABI, CONTRACT_ADDRESS } from '../config/contract'

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

function ImpactReports() {
  const { address } = useAccount()
  const [votingReportId, setVotingReportId] = useState<number | null>(null)

  const { data: reports, refetch } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: IMPACT_CHAIN_ABI,
    functionName: 'getImpactReports',
  })

  const { data: hash, writeContract, isPending } = useWriteContract()
  
  const { isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const handleVote = async (reportId: number, isUpvote: boolean) => {
    setVotingReportId(reportId)
    try {
      writeContract({
        address: CONTRACT_ADDRESS,
        abi: IMPACT_CHAIN_ABI,
        functionName: 'voteOnReport',
        args: [BigInt(reportId), isUpvote],
      })
    } catch (err) {
      console.error('Voting failed:', err)
    }
  }

  if (isSuccess) {
    setTimeout(() => {
      refetch()
      setVotingReportId(null)
    }, 2000)
  }

  if (!reports || reports.length === 0) {
    return (
      <div className="loading">
        <p>No impact reports yet. Be the first to submit one!</p>
      </div>
    )
  }

  return (
    <div>
      {(reports as ImpactReport[]).map((report, index) => (
        <div key={index} className="report-item">
          <div className="report-header">
            <div>
              <div className="report-meta">
                Report #{index} by {report.reporter.slice(0, 6)}...{report.reporter.slice(-4)}
              </div>
              <div className="report-meta">
                {new Date(Number(report.timestamp) * 1000).toLocaleDateString()}
              </div>
            </div>
            <div>
              {report.verified && <span className="badge badge-verified">✓ Verified</span>}
              {report.aiVerified && <span className="badge badge-ai-verified" style={{ marginLeft: '0.5rem' }}>🤖 AI Verified</span>}
              {!report.verified && !report.aiVerified && <span className="badge badge-pending">Pending</span>}
            </div>
          </div>

          <div className="report-description">{report.description}</div>

          {report.imageUrl && (
            <img
              src={report.imageUrl}
              alt="Impact"
              className="report-image"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          )}

          <div className="vote-section">
            <button
              className="btn btn-secondary"
              onClick={() => handleVote(index, true)}
              disabled={isPending && votingReportId === index}
              style={{ padding: '0.5rem 1rem' }}
            >
              👍 Upvote
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleVote(index, false)}
              disabled={isPending && votingReportId === index}
              style={{ padding: '0.5rem 1rem' }}
            >
              👎 Downvote
            </button>

            <div className="vote-count">
              <span>👍 {report.upvotes.toString()}</span>
              <span>👎 {report.downvotes.toString()}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ImpactReports
