import type { PageLoad } from './$types';
import type { Order } from '../app';

import makeApiUrl from '../types/makeApiUrl';
import type { components } from '../types/api';

async function loadOrders() {
	const res = await fetch(makeApiUrl('/order/'));
	const data: components['schemas']['ListOrdersResponseDTO'] = await res.json();

	return data;
}

export const load: PageLoad = async () => {
	return {
		items: await loadOrders()
	};
};
