export type TTransaction = {
	count: number;
	data: {
		amount: string;
		date: string;
		sn: string;
		type: string;
	}[];
	last_page: number;
};

export type TTransactionType = {
	code: string;
};
