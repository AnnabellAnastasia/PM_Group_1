import { formatDistance } from 'date-fns';

export function processDate(dateObj: any) {
	return formatDistance(dateObj, new Date()) + " ago";
}

export function capitalize(input: string) {
	return input.replace(/^\w/, (c) => c.toUpperCase());
}