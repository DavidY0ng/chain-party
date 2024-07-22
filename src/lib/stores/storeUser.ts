import { persisted } from 'svelte-persisted-store';
import { zeroAddress, type Address } from 'viem';

type TUserInfo = {
	user_id: string;
	web3_address: Address;
	upline: string;
	referral_code: string;
	point: number;
	mission_ongoing: number;
	mission_completed: number;
};

export const emptyUserInfo: TUserInfo = {
	user_id: '',
	web3_address: zeroAddress,
	upline: '',
	referral_code: '',
	point: 0,
	mission_ongoing: 0,
	mission_completed: 0
};

export const storeUserInfo = persisted<TUserInfo>('storeUserInfo', emptyUserInfo);

export type { TUserInfo };
