import type { PageLoad } from './$types';
import type { Neighborhood } from '../../app';

const NEIGHBORHOOD_API_URL = 'http://localhost:3000/neighborhoods';

async function loadNeighborhoods() {
	const res = await fetch(NEIGHBORHOOD_API_URL);
	const data: Neighborhood[] = await res.json();

	return data;
}

export const load: PageLoad = async () => {
	return {
		items: await loadNeighborhoods()
	};
};
