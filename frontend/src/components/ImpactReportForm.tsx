import { useState } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { IMPACT_CHAIN_ABI, CONTRACT_ADDRESS } from '../config/contract'
import axios from 'axios'

const BACKEND_URL = 'http://localhost:5000'

function ImpactReportForm() {
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [aiVerification, setAiVerification] = useState<any>(null)

  const { data: hash, writeContract, isPending, error } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const handleVerify = async () => {
    if (!description || !imageUrl) {
      alert('Please fill in all fields')
      return
    }

    setIsVerifying(true)
    try {
      const response = await axios.post(`${BACKEND_URL}/verify`, {
        description,
        imageUrl,
      })
      setAiVerification(response.data)
    } catch (err) {
      console.error('Verification failed:', err)
      alert('AI verification failed. You can still submit the report.')
    } finally {
      setIsVerifying(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!description || !imageUrl) {
      alert('Please fill in all fields')
      return
    }

    try {
      writeContract({
        address: CONTRACT_ADDRESS,
        abi: IMPACT_CHAIN_ABI,
        functionName: 'reportImpact',
        args: [description, imageUrl],
      })
    } catch (err) {
      console.error('Report submission failed:', err)
    }
  }

  if (isSuccess) {
    setTimeout(() => {
      setDescription('')
      setImageUrl('')
      setAiVerification(null)
    }, 2000)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the impact (e.g., Built a school with 50 students enrolled)"
          disabled={isPending || isConfirming}
        />
      </div>

      <div className="form-group">
        <label>Image URL</label>
        <input
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://example.com/image.jpg"
          disabled={isPending || isConfirming}
        />
      </div>

      {imageUrl && (
        <div style={{ marginBottom: '1rem' }}>
          <img
            src={imageUrl}
            alt="Preview"
            style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px' }}
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        </div>
      )}

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleVerify}
          disabled={isVerifying || isPending || isConfirming}
          style={{ flex: 1 }}
        >
          {isVerifying ? 'Verifying...' : '🤖 Verify with AI'}
        </button>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={isPending || isConfirming}
          style={{ flex: 1 }}
        >
          {isPending ? 'Confirming...' : isConfirming ? 'Processing...' : 'Submit Report'}
        </button>
      </div>

      {aiVerification && (
        <div className={aiVerification.verified ? 'success' : 'error'}>
          <strong>AI Verification:</strong> {aiVerification.message}
          <br />
          <small>Confidence: {(aiVerification.confidence * 100).toFixed(1)}%</small>
        </div>
      )}

      {error && (
        <div className="error">
          Error: {error.message}
        </div>
      )}

      {isSuccess && (
        <div className="success">
          ✅ Impact report submitted successfully!
        </div>
      )}
    </form>
  )
}

export default ImpactReportForm
