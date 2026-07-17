// since there's no dynamic data here, we can prerender

import type { Order } from '../app';
import type { PageLoad } from './$types';

// it so that it gets served as a static asset in production
// export const prerender = true;

const ORDERS_API_URL = 'http://localhost:8000';

async function loadOrders() {
	const res = await fetch(ORDERS_API_URL);
	const data: Order[] = await res.json();

	return data;
}

export const load: PageLoad = async () => {
	return {
		items: await loadOrders()
	};
};
