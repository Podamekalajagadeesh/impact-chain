export const IMPACT_CHAIN_ABI = [
  {
    "inputs": [{ "internalType": "bool", "name": "_isAnonymous", "type": "bool" }],
    "name": "donate",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "_description", "type": "string" },
      { "internalType": "string", "name": "_imageUrl", "type": "string" }
    ],
    "name": "reportImpact",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "_reportId", "type": "uint256" },
      { "internalType": "bool", "name": "_isUpvote", "type": "bool" }
    ],
    "name": "voteOnReport",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "_reportId", "type": "uint256" },
      { "internalType": "bool", "name": "_verified", "type": "bool" },
      { "internalType": "bool", "name": "_aiVerified", "type": "bool" }
    ],
    "name": "verifyReport",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getDonations",
    "outputs": [
      {
        "components": [
          { "internalType": "address", "name": "donor", "type": "address" },
          { "internalType": "uint256", "name": "amount", "type": "uint256" },
          { "internalType": "uint256", "name": "timestamp", "type": "uint256" },
          { "internalType": "bool", "name": "isAnonymous", "type": "bool" }
        ],
        "internalType": "struct ImpactChain.Donation[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getImpactReports",
    "outputs": [
      {
        "components": [
          { "internalType": "address", "name": "reporter", "type": "address" },
          { "internalType": "string", "name": "description", "type": "string" },
          { "internalType": "string", "name": "imageUrl", "type": "string" },
          { "internalType": "uint256", "name": "timestamp", "type": "uint256" },
          { "internalType": "uint256", "name": "upvotes", "type": "uint256" },
          { "internalType": "uint256", "name": "downvotes", "type": "uint256" },
          { "internalType": "bool", "name": "verified", "type": "bool" },
          { "internalType": "bool", "name": "aiVerified", "type": "bool" }
        ],
        "internalType": "struct ImpactChain.ImpactReport[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getTotalDonations",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getReportCount",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "donor", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" },
      { "indexed": false, "internalType": "bool", "name": "isAnonymous", "type": "bool" }
    ],
    "name": "DonationReceived",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "reporter", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "reportId", "type": "uint256" },
      { "indexed": false, "internalType": "string", "name": "description", "type": "string" }
    ],
    "name": "ImpactReported",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "uint256", "name": "reportId", "type": "uint256" },
      { "indexed": true, "internalType": "address", "name": "voter", "type": "address" },
      { "indexed": false, "internalType": "bool", "name": "isUpvote", "type": "bool" }
    ],
    "name": "ReportVoted",
    "type": "event"
  }
] as const;

// Replace with your deployed contract address
export const CONTRACT_ADDRESS = '0x24C7803fc96f97bD854696c27DF1ec3e55fded6A' as `0x${string}`;
