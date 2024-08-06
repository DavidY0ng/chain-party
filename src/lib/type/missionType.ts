export type TMission = {
	sn: string;
	name: string;
	description: string;
	reward: [
		{
			wallet: string;
			amount: string;
		}
	];
	action: string;
	type: 'daily' | 'weekly' | 'permanent' | '';
	status: string;
	progress: number;
	current: number;
	requirement: number;
	auto_take: number;
};
