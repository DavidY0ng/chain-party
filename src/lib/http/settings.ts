import {
    PUBLIC_NODE_ENV,
    PUBLIC_STAG_API_BASE,
    PUBLIC_STAG_WS_BASE,
    PUBLIC_PROD_API_BASE,
    PUBLIC_PROD_WS_BASE
} from '$env/static/public';

export const urlList = {
    dev: {
        apiBase: PUBLIC_STAG_API_BASE,
        wsBase: PUBLIC_STAG_WS_BASE
    },
    live: {
        apiBase: PUBLIC_PROD_API_BASE,
        wsBase: PUBLIC_PROD_WS_BASE
    }
};

export const urls = PUBLIC_NODE_ENV === 'production' ? urlList.live : urlList.dev;