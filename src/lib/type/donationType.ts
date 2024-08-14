type TDonationLeaderboard = {
	data: {
		rank: number;
		address: string;
		amount: string;
		is_self: boolean;
	}[];
	count: number;
	last_page: number;
};

export type { TDonationLeaderboard };
