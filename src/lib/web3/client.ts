import { createConfig } from '@wagmi/core';
import {
	createPublicClient,
	createWalletClient,
	custom,
	http,
	type Chain,
	type WalletClient
} from 'viem';
import { bsc, bscTestnet } from 'viem/chains';

const isProduction = process.env.NODE_ENV === 'production';
export const bscChain: Chain = isProduction ? bsc : bscTestnet;

export const wagmiConfig = createConfig({
	chains: [bscChain],
	client({ chain }) {
		return createPublicClient({ chain, transport: http() });
	}
});

export let walletClient: WalletClient;

// Wagmi Public Client with specified chain
export const bscClient = createPublicClient({
	chain: bscChain,
	transport: http()
});

// Remember to declare window.ethereum exist first or else program will crash !
if (typeof window !== 'undefined' && window.ethereum) {
	walletClient = createWalletClient({
		chain: bscChain,
		transport: custom(window.ethereum!)
	});
}
