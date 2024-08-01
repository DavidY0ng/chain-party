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
	}
];
