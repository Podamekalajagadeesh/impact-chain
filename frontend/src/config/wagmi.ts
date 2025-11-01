import { http, createConfig } from 'wagmi'
import { holesky, hardhat } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [holesky, hardhat],
  connectors: [injected()],
  transports: {
    [holesky.id]: http('https://holesky.drpc.org'),
    [hardhat.id]: http('http://127.0.0.1:8545'),
  },
})
