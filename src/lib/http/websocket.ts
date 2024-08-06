/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '$lib/http/https';
import { urls } from '$lib/http/settings';

class AppWebSocket {
	client: WebSocket;
	handlers: { [key: string]: (data: any) => void };

	constructor() {
		this.client = new WebSocket(urls.wsBase);
		this.handlers = {};
		this.listen();
	}

	async bind(client_id: string) {
		return api.post('dapp/websocket/bind', { data: { client_id } });
	}

	listen() {
		this.client.onmessage = async (e) => {
			try {
				const topic = JSON.parse(e.data);

				if (this.handlers[topic.type]) {
					this.handlers[topic.type](topic.data);
				} else {
					console.warn(`No handler for topic: ${topic.type}`);
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

if (typeof window !== 'undefined') {
	WebSocketService = new AppWebSocket();
}

export async function onBindWebsocket() {
	WebSocketService.on('client_id', async (data) => {
		console.log('Received client_id:', data);
		await WebSocketService.bind(data);
	});
}
