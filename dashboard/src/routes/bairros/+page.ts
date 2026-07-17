import type { PageLoad } from './$types';
import type { components } from '../../types/api';

import makeApiUrl from '../../types/makeApiUrl';

const NEIGHBORHOOD_API_URL = makeApiUrl('/neighborhood/');

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
