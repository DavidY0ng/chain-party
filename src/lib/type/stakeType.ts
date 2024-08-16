export type TStakeList = {
	data: {
		sn: string;
		date: string;
		type: string;
		amount: string;
	}[];
	count: number;
	last_page: number;
};

export type TLockedData = readonly [
	{
		lockAmount: bigint;
		countLock: bigint;
	},
	readonly {
		initLockTime: number;
		latestPEICReleasedAt: number;
		releaseAllPEICTime: number;
		initLockAmount: bigint;
		lockAmount: bigint;
	}[]
];
