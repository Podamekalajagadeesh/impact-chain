import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("ImpactChainModule", (m) => {
  const impactChain = m.contract("ImpactChain");

  return { impactChain };
});
