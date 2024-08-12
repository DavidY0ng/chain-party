/* eslint-disable @typescript-eslint/no-explicit-any */
import Cookies from 'js-cookie';
import { urls } from './settings';
import type { APIMethod, APIOptions, APIResponse } from '$lib/type/commonType';
import { toast } from 'svelte-sonner';
import { onDisconnect } from '$lib/web3/wagmi';

class API {
	private async request<T = any>(
		method: APIMethod,
		resource: string, //url endpoint
		{ data, useToken = true }: APIOptions = {}
	): Promise<APIResponse<T>> {
		try {
			const queryString =
				method === 'GET' && data ? '?' + new URLSearchParams(data).toString() : '';

			const headers: HeadersInit = {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			};

			if (useToken) {
				const tokenApi = Cookies.get('accessToken');
				if (tokenApi) {
					headers.Authorization = `Bearer ${tokenApi}`;
				}
			}

			const response = await fetch(`${urls.apiBase}${resource}${queryString}`, {
				method,
				mode: 'cors',
				headers,
				body: method !== 'GET' ? JSON.stringify(data) : null
			});

			const resp: APIResponse<T> = await response.json();

			if (resp.data === '901') {
				onDisconnect();
				toast.warning('Session Expired... Please Login Again');
			}

			return resp;
		} catch (err) {
			console.error('API call error:', err);
			throw err;
		}
	}

	public get<T = any>(resource: string, options?: APIOptions): Promise<APIResponse<T>> {
		return this.request('GET', resource, options);
	}

	public post<T = any>(resource: string, options?: APIOptions): Promise<APIResponse<T>> {
		return this.request('POST', resource, options);
	}

	public put<T = any>(resource: string, options?: APIOptions): Promise<APIResponse<T>> {
		return this.request('PUT', resource, options);
	}

	public delete<T = any>(resource: string, options?: APIOptions): Promise<APIResponse<T>> {
		return this.request('DELETE', resource, options);
	}
}

export const api = new API();
