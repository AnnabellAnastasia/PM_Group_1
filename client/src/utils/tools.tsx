import { format } from 'date-fns';

export function processDate(dateObj: any) {
	return format(new Date(dateObj), "PPP");
}