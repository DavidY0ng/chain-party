import { persisted } from 'svelte-persisted-store';

type TStoreLocal = {
	lang: string;
}

export const emptyLocalStorage: TStoreLocal = {
	lang: 'en'
};

export const storeLocal = persisted<TStoreLocal>('storeLocal', emptyLocalStorage);
export type { TStoreLocal }
