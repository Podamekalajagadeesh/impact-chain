# 🚀 Impact Chain - Quick Start Guide

## ⚠️ Important: Node.js v22 Required!

Before starting, **you must upgrade to Node.js v22** because Hardhat v3 requires it.

### Step 1: Upgrade Node.js

Open a **new terminal** and run:

```bash
nvm install 22
nvm use 22
nvm alias default 22
node --version  # Should show v22.x.x
```

Close and reopen your terminal after this to ensure the new version is active.

---

## 🎯 Two Ways to Start the Platform

### Option A: Automated Start (Recommended)

Once Node.js v22 is installed, simply run:

```bash
cd "/Users/jagadeesh/impact chain"
./start.sh
```

This will:
1. ✅ Start the local blockchain
2. ✅ Deploy the contract automatically
3. ✅ Update the frontend with the contract address
4. ✅ Start the Python backend
5. ✅ Start the React frontend

To stop everything:
```bash
./stop.sh
```

---

### Option B: Manual Start (Step-by-Step)

#### Terminal 1: Start Blockchain
```bash
cd "/Users/jagadeesh/impact chain/smart-contract"
npx hardhat node
```
**Keep this terminal running!** You'll see 20 test accounts with private keys.

#### Terminal 2: Deploy Contract
```bash
cd "/Users/jagadeesh/impact chain/smart-contract"
npx hardhat run scripts/deploy.ts --network localhost
```
**Copy the contract address** from the output (e.g., `0x5FbDB2315678afecb367f032d93F642f64180aa3`)

Update the contract address in `frontend/src/config/contract.ts`:
```typescript
export const CONTRACT_ADDRESS = '0xYourAddressHere' as `0x${string}`;
```

#### Terminal 3: Start Backend
```bash
cd "/Users/jagadeesh/impact chain/backend"
source venv/bin/activate
python app.py
```
Backend will run on http://localhost:5000

#### Terminal 4: Start Frontend
```bash
cd "/Users/jagadeesh/impact chain/frontend"
npm install  # First time only
npm run dev
```
Frontend will run on http://localhost:3000

---

## 🦊 MetaMask Setup

1. Open MetaMask and click the network dropdown
2. Add Network → Add a network manually
3. Enter:
   - **Network Name:** Hardhat Local
   - **RPC URL:** http://127.0.0.1:8545
   - **Chain ID:** 31337
   - **Currency Symbol:** ETH
4. Import a test account:
   - Click your account icon → Import Account
   - Paste one of the private keys from Terminal 1
   - **DO NOT** use real funds on these test accounts!

---

## 🎮 Testing the Platform

### 1. Make a Donation
1. Open http://localhost:3000
2. Click "Connect Wallet"
3. Enter amount (e.g., 0.1 ETH)
4. Check "Make this donation anonymous" (optional)
5. Click "Donate" and confirm in MetaMask
6. Watch the stats update!

### 2. Submit Impact Report
1. Fill in description (e.g., "Built a school with 50 students")
2. Add image URL (e.g., https://picsum.photos/400)
3. Click "🤖 Verify with AI" to test AI verification
4. Click "Submit Report" and confirm
5. Your report appears below!

### 3. Vote on Reports
1. Scroll to the Impact Reports section
2. Click 👍 Upvote or 👎 Downvote
3. Confirm the transaction
4. You can only vote once per report!

---

## 🔧 Troubleshooting

### Error: "Plugin hardhat-toolbox-viem is missing a peer dependency"
Already fixed! We removed the conflicting `hardhat-toolbox` package.

### Error: "Node.js 20.19.3 which is not supported"
**Solution:** You must upgrade to Node.js v22:
```bash
nvm install 22
nvm use 22
nvm alias default 22
```

### MetaMask: "Nonce too high"
**Solution:** Reset your account:
1. MetaMask → Settings → Advanced
2. Clear activity tab data
3. Try the transaction again

### Frontend can't connect to contract
**Solution:** Make sure the contract address in `frontend/src/config/contract.ts` matches the deployed address from Terminal 2.

### Backend not responding
**Solution:** Check if it's running:
```bash
curl http://localhost:5000/health
```
Should return: `{"status":"ok","message":"AI Verification Service Running"}`

---

## 📊 Contract Interaction Scripts

Test the contract directly:

```bash
cd "/Users/jagadeesh/impact chain/smart-contract"
export CONTRACT_ADDRESS=0xYourAddressHere
npx hardhat run scripts/interact.ts --network localhost
```

This will:
- Make test donations
- Submit test reports
- Vote on reports
- Display all data

---

## 🌐 Deploy to Sepolia Testnet

1. Get Sepolia ETH from a faucet
2. Create `.env` in smart-contract folder:
   ```
   SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY
   SEPOLIA_PRIVATE_KEY=your_private_key
   ```
3. Deploy:
   ```bash
   npx hardhat run scripts/deploy.ts --network sepolia
   ```
4. Update contract address in frontend
5. Change MetaMask to Sepolia network

---

## 📝 What You Built

✅ **Smart Contract** - Transparent donations, impact tracking, voting  
✅ **React Dashboard** - Beautiful UI with wallet connection  
✅ **AI Backend** - Automated report verification  
✅ **Anonymous Donations** - Privacy-preserving transactions  
✅ **Community Voting** - Democratic verification system  

---

## 🎉 You're Ready!

Once Node.js v22 is installed, just run `./start.sh` and your complete Impact Chain platform will be live!

**Next Steps:**
1. ✅ Upgrade to Node.js v22
2. ✅ Run `./start.sh`
3. ✅ Open http://localhost:3000
4. ✅ Connect MetaMask
5. ✅ Start making a difference! 🌍

---

**Questions?** Check the detailed README in `docs/README.md`
