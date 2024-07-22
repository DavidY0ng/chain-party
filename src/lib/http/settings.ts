export const urlList = {
	dev: {
		apiBase: import.meta.env.STAG_API_BASE,
		wsBase: import.meta.env.STAG_WS_BASE
	},
	live: {
		apiBase: import.meta.env.PROD_API_BASE,
		wsBase: import.meta.env.PROD_WS_BASE
	}
};

export const urls = import.meta.env.NODE_ENV === 'production' ? urlList.live : urlList.dev;
