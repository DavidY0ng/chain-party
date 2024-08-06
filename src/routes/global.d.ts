import { MetaMaskInpageProvider } from '@metamask/providers';

declare global {
	interface Window {
		ethereum: MetaMaskInpageProvider;
		Telegram: any;
	}
}


console.log(window.Telegram.WebApp.initData)