/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '$lib/http/https';
import { urls } from '$lib/http/settings';
import { isToken } from '$lib/stores/storeCommon';
import { storeUserInfo } from '$lib/stores/storeUser';
import { get } from 'svelte/store';
import { zeroAddress } from 'viem';

export class AppWebSocket {
	client: WebSocket;
	handlers: { [key: string]: (data: any) => void };

	constructor() {
		this.client = new WebSocket(urls.wsBase);
		this.handlers = {};
		this.listen();
	}

	async bind(client_id: string) {
		return api.post('/dapp/websocket/bind', { data: { client_id } });
	}

	listen() {
		this.client.onmessage = async (e) => {
			try {
				const message = JSON.parse(e.data);
				console.log(message);
				if (this.handlers[message.type]) {
					this.handlers[message.type](message.data);
				} else if (message.type === 'ping') {
					null;
				} else {
					console.warn(`No handler for topic: ${message.type}`);
				}
			} catch (error) {
				throw new Error(`Failed to listen on websocket: ${error}`);
			}
		};
	}

	on(topic: string, handler: (data: any) => void) {
		this.handlers[topic] = handler;
	}

	close() {
		this.client.close();
	}
}

export let WebSocketService: AppWebSocket;

export async function initializedWebsocket() {
	WebSocketService = new AppWebSocket();

	if (get(storeUserInfo).web3_address !== zeroAddress && get(isToken) !== undefined) {
		WebSocketService.on('clientId', async (data) => {
			await WebSocketService.bind(data);
		});
	}
}
