import { ethers } from "ethers";
import hre from "hardhat";

async function main() {
  console.log("Deploying ImpactChain contract...");

  const url = "http://127.0.0.1:8545";
  const privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
  const provider = new ethers.JsonRpcProvider(url);
  const signer = new ethers.Wallet(privateKey, provider);

  const artifact = await hre.artifacts.readArtifact("ImpactChain");
  const ImpactChain = new ethers.ContractFactory(artifact.abi, artifact.bytecode, signer);
  const impactChain = await ImpactChain.deploy();
  await impactChain.waitForDeployment();

  const address = await impactChain.getAddress();

  console.log(`ImpactChain deployed to: ${address}`);

  console.log("\nSave this address for interacting with the contract:");
  console.log(`export CONTRACT_ADDRESS=${address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
