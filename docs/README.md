# 🌍 Impact Chain

A blockchain-based transparent donation platform with verifiable impact tracking, community voting, and AI-powered verification.

## 🎯 Features

- **💝 Transparent Donations**: Make public or anonymous donations via blockchain
- **📝 Impact Reporting**: Submit verifiable impact reports with images
- **🗳️ Community Voting**: Vote on impact reports to ensure accountability
- **🤖 AI Verification**: Automated verification of impact reports using AI
- **🔒 Privacy-First**: Support for anonymous donations
- **⛓️ Blockchain-Backed**: All transactions recorded on-chain for transparency

## 🏗️ Project Structure

```
impact-chain/
├── smart-contract/     # Solidity smart contracts (Hardhat)
├── frontend/           # React + TypeScript + Wagmi
├── backend/           # Python Flask AI verification service
└── docs/             # Documentation
```

## 🚀 Quick Start

### Prerequisites

- Node.js v22+ (for Hardhat v3 compatibility)
- Python 3.8+
- MetaMask or another Web3 wallet

### 1. Smart Contract Setup

First, upgrade to Node.js 22:
```bash
nvm install 22
nvm use 22
nvm alias default 22
```

Then compile and deploy:
```bash
cd smart-contract
npm install
npx hardhat compile
npx hardhat node  # In one terminal
npx hardhat run scripts/deploy.ts --network localhost  # In another terminal
```

Save the deployed contract address and update it in `frontend/src/config/contract.ts`.

### 2. Backend Setup

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

The backend will run on `http://localhost:5000`.

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:3000`.

### 4. Connect Your Wallet

1. Open `http://localhost:3000` in your browser
2. Make sure MetaMask is connected to localhost:8545
3. Import a test account from Hardhat (check terminal for private keys)
4. Click "Connect Wallet" and start using the app!

## 📋 Usage

### Making a Donation

1. Connect your wallet
2. Enter the donation amount in ETH
3. Optionally check "Make this donation anonymous"
4. Click "Donate"
5. Confirm the transaction in MetaMask

### Submitting an Impact Report

1. Fill in the description and image URL
2. Click "🤖 Verify with AI" (optional but recommended)
3. Review the AI verification results
4. Click "Submit Report"
5. Confirm the transaction

### Voting on Reports

1. Browse the impact reports
2. Click "👍 Upvote" or "👎 Downvote"
3. Confirm the transaction
4. You can only vote once per report

## 🧪 Testing

### Run Smart Contract Tests

```bash
cd smart-contract
npx hardhat test
```

### Interact with Deployed Contract

```bash
cd smart-contract
export CONTRACT_ADDRESS=0x... # Your deployed address
npx hardhat run scripts/interact.ts --network localhost
```

## 🛠️ Tech Stack

### Smart Contracts
- Solidity 0.8.28
- Hardhat 3.x
- Viem for deployment

### Frontend
- React 18
- TypeScript
- Wagmi (Web3 hooks)
- Viem (Ethereum library)
- Vite (build tool)

### Backend
- Python 3
- Flask
- Flask-CORS
- Mock AI (ready for real AI integration)

## 🔐 Security Features

- ✅ Anonymous donations (address stored as 0x0)
- ✅ One vote per address per report
- ✅ All transactions on-chain and verifiable
- ✅ AI verification for fraud detection
- ✅ Community-based verification through voting

## 🌐 Network Configuration

The project is configured for:
- **Local Development**: Hardhat Network (localhost:8545)
- **Testnet**: Sepolia (configured in hardhat.config.ts)

To deploy to Sepolia:
1. Set environment variables in `.env`:
   ```
   SEPOLIA_RPC_URL=https://eth-sepolia...
   SEPOLIA_PRIVATE_KEY=your-private-key
   ```
2. Deploy: `npx hardhat run scripts/deploy.ts --network sepolia`

## 📊 Contract Functions

### Write Functions
- `donate(bool _isAnonymous)` - Make a donation
- `reportImpact(string _description, string _imageUrl)` - Submit impact report
- `voteOnReport(uint256 _reportId, bool _isUpvote)` - Vote on a report
- `verifyReport(uint256 _reportId, bool _verified, bool _aiVerified)` - Verify report (admin)

### Read Functions
- `getDonations()` - Get all donations
- `getImpactReports()` - Get all impact reports
- `getTotalDonations()` - Get total donation amount
- `getReportCount()` - Get number of reports

## 🎨 Future Enhancements

- [ ] Real AI/ML models for image and text verification
- [ ] IPFS integration for decentralized image storage
- [ ] DAO governance for platform decisions
- [ ] Multi-signature wallet for fund management
- [ ] Mobile app (React Native)
- [ ] Email notifications for donations
- [ ] Advanced analytics dashboard
- [ ] Integration with multiple blockchains

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

ISC

## 🙏 Acknowledgments

Built with ❤️ for transparent and verifiable charitable giving.

---

**Note**: This is a demo project. For production use, implement proper AI models, security audits, and thoroughly test all smart contracts.