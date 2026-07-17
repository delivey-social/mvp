import type { Neighborhood } from '../../app';
import type { components } from '../../types/api';
import type { PageLoad } from './$types';

const NEIGHBORHOOD_API_URL = import.meta.env.VITE_API_URL + '/neighborhood';

async function loadNeighborhoods() {
	const res = await fetch(NEIGHBORHOOD_API_URL);
	const data: components['schemas']['ListNeighborhoodsResponseDTO'] = await res.json();

	return data;
}

export const load: PageLoad = async () => {
	return {
		items: await loadNeighborhoods()
	};
};
