import type { Hash } from 'viem';

export type TTotalClaimed = {
	usdt: number;
	peic: number;
};

export type TCheckClaim = {
	claimable: boolean;
	cooldown: number;
};

export type TClaimPayload = {
	amount: string;
	signature: Hash;
};

export type TRewardBalance = {
	fuel_reward: number;
	jetpot_reward: number;
	planet_reward: number;
	total_unclaimed_reward: number;
};

// interface
export interface IPendingBonus {
	totalUSDT: string;
	totalPEICReward: string;
	totalPEICLocked: string;
}

export interface IPendingRefund {
	totalUSDT: string;
	totalPEIC: string;
	totalPartyTicket: string;
}
