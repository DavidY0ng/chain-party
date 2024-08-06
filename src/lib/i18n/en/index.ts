const lang = 'en';

export default [
	{
		locale: lang,
		key: 'common',
		loader: async () => (await import('./common.json')).default
	},
	{
		locale: lang,
		key: 'transaction',
		loader: async () => (await import('./transaction.json')).default
	},
	{
		locale: lang,
		key: 'landing',
		loader: async () => (await import('./landing.json')).default
	},
	{
		locale: lang,
		key: 'donate',
		loader: async () => (await import('./donate.json')).default
	},
	{
		locale: lang,
		key: 'game',
		loader: async () => (await import('./game.json')).default
	},
	{
		locale: lang,
		key: 'history',
		loader: async () => (await import('./history.json')).default
	},
	{
		locale: lang,
		key: 'home',
		loader: async () => (await import('./home.json')).default
	},
	{
		locale: lang,
		key: 'jackpot',
		loader: async () => (await import('./jackpot.json')).default
	},
	{
		locale: lang,
		key: 'referral',
		loader: async () => (await import('./referral.json')).default
	},
	{
		locale: lang,
		key: 'stake',
		loader: async () => (await import('./stake.json')).default
	},
];
