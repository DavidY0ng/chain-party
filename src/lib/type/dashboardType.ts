type TDashboardPool = {
	moon: {
		current: number;
		max: number;
		total_reward: number;
	};
	mars: {
		current: number;
		max: number;
		total_reward: number;
	};
	jupiter: {
		current: number;
		max: number;
		total_reward: number;
	};
	saturn: {
		current: number;
		max: number;
		total_reward: number;
	};
	uranus: {
		current: number;
		max: number;
		total_reward: number;
	};
};

type TPlanet = 'moon' | 'mars' | 'jupiter' | 'saturn' | 'uranus';

export type { TDashboardPool, TPlanet };
