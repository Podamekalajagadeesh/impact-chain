import { useState, useEffect } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther } from 'viem'
import { IMPACT_CHAIN_ABI, CONTRACT_ADDRESS } from '../config/contract'

function DonationForm() {
  const [amount, setAmount] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(false)

  const { data: hash, writeContract, isPending, error } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  // Quick donation amounts
  const quickAmounts = ['0.01', '0.05', '0.1', '0.5', '1']

  const handleQuickAmount = (value: string) => {
    setAmount(value)
  }

  // Confetti animation
  useEffect(() => {
    if (isSuccess) {
      createConfetti()
      setTimeout(() => {
        setAmount('')
        setIsAnonymous(false)
      }, 3000)
    }
  }, [isSuccess])

  const createConfetti = () => {
    const colors = ['#667eea', '#764ba2', '#fbbf24', '#10b981', '#ef4444']
    const confettiCount = 50
    
    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div')
      confetti.style.position = 'fixed'
      confetti.style.width = '10px'
      confetti.style.height = '10px'
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
      confetti.style.left = Math.random() * 100 + '%'
      confetti.style.top = '-10px'
      confetti.style.opacity = '1'
      confetti.style.transform = 'rotate(' + Math.random() * 360 + 'deg)'
      confetti.style.zIndex = '10000'
      confetti.style.pointerEvents = 'none'
      
      document.body.appendChild(confetti)
      
      const fall = confetti.animate([
        { transform: `translateY(0) rotate(0deg)`, opacity: 1 },
        { transform: `translateY(${window.innerHeight + 20}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
      ], {
        duration: Math.random() * 3000 + 2000,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      })
      
      fall.onfinish = () => confetti.remove()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount')
      return
    }

    try {
      writeContract({
        address: CONTRACT_ADDRESS,
        abi: IMPACT_CHAIN_ABI,
        functionName: 'donate',
        args: [isAnonymous],
        value: parseEther(amount),
      })
    } catch (err) {
      console.error('Donation failed:', err)
    }
  }

  const handleShare = (platform: string) => {
    const text = `I just donated ${amount} ETH to Impact Chain! 🌍 Join me in making a difference! #ImpactChain #Blockchain #Charity`
    const url = window.location.href
    
    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank')
    } else if (platform === 'telegram') {
      window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank')
    } else if (platform === 'copy') {
      navigator.clipboard.writeText(`${text}\n${url}`)
      alert('Copied to clipboard!')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Quick Select (ETH)</label>
        <div className="quick-donations">
          {quickAmounts.map((value) => (
            <button
              key={value}
              type="button"
              className={`quick-donate-btn ${amount === value ? 'selected' : ''}`}
              onClick={() => handleQuickAmount(value)}
              disabled={isPending || isConfirming}
            >
              {value} ETH
            </button>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Custom Amount (ETH)</label>
        <input
          type="number"
          step="0.001"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.1"
          disabled={isPending || isConfirming}
        />
      </div>

      <div className="form-group">
        <div className="checkbox-group">
          <input
            type="checkbox"
            id="anonymous"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
            disabled={isPending || isConfirming}
          />
          <label htmlFor="anonymous">Make this donation anonymous</label>
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        disabled={isPending || isConfirming}
        style={{ width: '100%' }}
      >
        {isPending ? 'Confirming...' : isConfirming ? 'Processing...' : '💝 Donate Now'}
      </button>

      {error && (
        <div className="error" style={{ marginTop: '1rem' }}>
          Error: {error.message}
        </div>
      )}

      {isSuccess && (
        <>
          <div className="success" style={{ marginTop: '1rem' }}>
            🎉 Donation successful! Thank you for your contribution.
          </div>
          <div className="share-section">
            <button type="button" className="share-btn twitter" onClick={() => handleShare('twitter')}>
              🐦 Share on Twitter
            </button>
            <button type="button" className="share-btn telegram" onClick={() => handleShare('telegram')}>
              ✈️ Share on Telegram
            </button>
            <button type="button" className="share-btn copy" onClick={() => handleShare('copy')}>
              📋 Copy Link
            </button>
          </div>
        </>
      )}
    </form>
  )
}

export default DonationForm
