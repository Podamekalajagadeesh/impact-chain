import hre from "hardhat";
import { parseEther, formatEther } from "viem";

async function main() {
  const [deployer, user1, user2] = await hre.viem.getWalletClients();
  
  // Replace with your deployed contract address after deployment
  const contractAddress = process.env.CONTRACT_ADDRESS as `0x${string}`;
  
  if (!contractAddress) {
    console.error("Please set CONTRACT_ADDRESS environment variable");
    process.exit(1);
  }

  const impactChain = await hre.viem.getContractAt(
    "ImpactChain",
    contractAddress
  );

  console.log("=== ImpactChain Interaction Scripts ===\n");

  // 1. Make a donation (public)
  console.log("1. Making a public donation of 0.1 ETH...");
  const donateTx = await impactChain.write.donate([false], {
    value: parseEther("0.1"),
  });
  console.log(`   Transaction hash: ${donateTx}`);

  // 2. Make an anonymous donation
  console.log("\n2. Making an anonymous donation of 0.05 ETH...");
  const anonDonateTx = await impactChain.write.donate([true], {
    value: parseEther("0.05"),
    account: user1.account,
  });
  console.log(`   Transaction hash: ${anonDonateTx}`);

  // 3. Submit an impact report
  console.log("\n3. Submitting an impact report...");
  const reportTx = await impactChain.write.reportImpact([
    "Built a school in rural area with 50 students enrolled",
    "https://example.com/image.jpg",
  ]);
  console.log(`   Transaction hash: ${reportTx}`);

  // 4. Vote on a report
  console.log("\n4. Voting on impact report #0 (upvote)...");
  const voteTx = await impactChain.write.voteOnReport([BigInt(0), true], {
    account: user2.account,
  });
  console.log(`   Transaction hash: ${voteTx}`);

  // 5. Get all donations
  console.log("\n5. Fetching all donations...");
  const donations = await impactChain.read.getDonations();
  console.log(`   Total donations: ${donations.length}`);
  donations.forEach((donation: any, index: number) => {
    console.log(`   Donation ${index}:`);
    console.log(`     Donor: ${donation.isAnonymous ? "Anonymous" : donation.donor}`);
    console.log(`     Amount: ${formatEther(donation.amount)} ETH`);
    console.log(`     Timestamp: ${new Date(Number(donation.timestamp) * 1000).toLocaleString()}`);
  });

  // 6. Get all impact reports
  console.log("\n6. Fetching all impact reports...");
  const reports = await impactChain.read.getImpactReports();
  console.log(`   Total reports: ${reports.length}`);
  reports.forEach((report: any, index: number) => {
    console.log(`   Report ${index}:`);
    console.log(`     Reporter: ${report.reporter}`);
    console.log(`     Description: ${report.description}`);
    console.log(`     Upvotes: ${report.upvotes}, Downvotes: ${report.downvotes}`);
    console.log(`     Verified: ${report.verified}, AI Verified: ${report.aiVerified}`);
  });

  // 7. Get total donations
  console.log("\n7. Getting total donations...");
  const totalDonations = await impactChain.read.getTotalDonations();
  console.log(`   Total: ${formatEther(totalDonations)} ETH`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
