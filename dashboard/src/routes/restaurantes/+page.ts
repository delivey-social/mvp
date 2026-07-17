import type { PageLoad } from '../$types';
import type { components } from '../../types/api';
import makeApiUrl from '../../types/makeApiUrl';

async function loadRestaurants() {
	const res = await fetch(makeApiUrl('/restaurant/'));
	const data: components['schemas']['ListRestaurantResponseDTO'] = await res.json();

	return data;
}

export const load: PageLoad = async () => {
	return {
		items: await loadRestaurants()
	};
};
