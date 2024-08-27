import { reconnect } from '@wagmi/core';
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi';
import {
	createPublicClient,
	createWalletClient,
	custom,
	http,
	type Chain,
	type WalletClient
} from 'viem';
import { bscTestnet } from 'viem/chains';

// Chain
const isProduction = process.env.NODE_ENV === 'production';
export const bscChain: Chain = bscTestnet;

// 1. Get a project ID at https://cloud.walletconnect.com
const projectId = 'f8efd8f657b6f8b08092d75ffb255ba7';

// 2. Create wagmiConfig
const metadata = {
	name: 'AppKit',
	description: 'AppKit Example',
	url: 'https://web3modal.com', // origin must match your domain & subdomain.
	icons: ['https://avatars.githubusercontent.com/u/37784886']
};

const chains = [bscChain] as const;

// Define wagmi config
export const wagmiConfig = defaultWagmiConfig({
	chains,
	projectId,
	metadata,
	client({ chain }) {
		return createPublicClient({ chain, transport: http() });
	}
});
reconnect(wagmiConfig);

// 3. Create modal
export const web3Modal = createWeb3Modal({
	wagmiConfig,
	projectId
});

// Lower level public Client and wallet client
export let walletClient: WalletClient;

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
