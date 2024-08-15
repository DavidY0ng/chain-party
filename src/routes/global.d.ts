/* eslint-disable @typescript-eslint/no-explicit-any */
import { MetaMaskInpageProvider } from '@metamask/providers';

declare global {
	interface Window {
		ethereum: MetaMaskInpageProvider;
		Telegram: any;
	}
}
