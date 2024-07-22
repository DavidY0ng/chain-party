import { toast } from 'svelte-sonner';
import { InsufficientFundsError } from 'viem';

interface GetErrorType {
	walk: (callback: (e: unknown) => boolean) => boolean;
	shortMessage: string;
}

export const onTranslateErrMsg = (e: unknown) => {
	const error = e as GetErrorType;
	const isInsufficientFundsError = error.walk((e: unknown) => e instanceof InsufficientFundsError);

	if (isInsufficientFundsError) {
		toast.error('Not Enough Balance in Wallet');
	} else {
		toast.error(error.shortMessage);
	}
};

export const truncateString = (str: string, startNum: number, endNum: number) => {
	if (!str) {
		return;
	}
	if (str.length <= startNum + endNum) {
		return str;
	}
	const startStr = str.slice(0, startNum);
	const endStr = str.slice(-endNum);
	return `${startStr}...${endStr}`;
};

export function copyToClipboard(text: string) {
	// Check if the Clipboard API is available
	if (navigator.clipboard) {
		navigator.clipboard
			.writeText(text)
			.then(() => {
				toast.success('Copied !');
			})
			.catch((error) => {
				console.error('Unable to copy text to clipboard', error);
			});
	} else {
		try {
			const storage = document.createElement('textarea');
			storage.value = text;
			document.body.appendChild(storage);
			storage.select();
			storage.setSelectionRange(0, 99999);
			document.execCommand('copy');
			document.body.removeChild(storage);
			toast.success('Copied !');
		} catch (err) {
			console.error('Unable to copy text to clipboard', err);
		}
	}
}

export function filterInput(e: InputEvent): string | undefined {
	const target = e.target as HTMLInputElement;
	const inputAmount = target.value;
	const regex = /^[0-9]*\.?[0-9]*$/;

	if (regex.test(inputAmount)) {
		return inputAmount;
	}
}

export function formatTimestamp(timestamp: number) {
	const date = new Date(timestamp);

	// Define the formatting options with correct types
	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: 'numeric',
		minute: '2-digit',
		hour12: true
	};

	// Create the formatter with the given options
	const formatter = new Intl.DateTimeFormat('en-US', options);

	// Format the date and return the result
	return formatter.format(date);
}
