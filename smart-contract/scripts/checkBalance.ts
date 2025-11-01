import hre from "hardhat";
import { formatEther } from "ethers";

async function main() {
  const address = "0xb929F725D3d14f19b0b9bBA4C9AAD7084955755d";
  const balance = await hre.ethers.provider.getBalance(address);
  console.log(`Balance of ${address}: ${formatEther(balance)} ETH`);

  if (balance.isZero()) {
    console.log("The address has no balance.");
  } else {
    console.log(`Balance of ${address}: ${formatEther(balance)} ETH`);
  }
}

main().catch(console.error);