import { format } from 'date-fns';

export function processDate(dateObj: any) {
	return format(new Date(dateObj), "PPP");
}

export function capitalize(input: string) {
	return input.replace(/^\w/, (c) => c.toUpperCase());
}