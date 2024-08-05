/* eslint-disable @typescript-eslint/no-explicit-any */
export type APIResponse<T = any> = {
	success: boolean;
	data: T;
	msg: string;
};

export type APIMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

// ***************** Interface *************

export interface APIOptions {
	data?: Record<string, any>;
	useToken?: boolean;
}

export interface IPagination {
	page: number;
	size: number;
}
