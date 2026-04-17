import type { PageLoad } from '../$types';
import type { Restaurant } from '../../app';

const RESTAURANT_API_URL = 'http://localhost:3000/restaurante';

async function loadRestaurants() {
	const res = await fetch(RESTAURANT_API_URL);
	const data: Restaurant[] = await res.json();

	return data;
}

export const load: PageLoad = async () => {
	return {
		items: await loadRestaurants()
	};
};
