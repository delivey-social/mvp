import makeApiUrl from '../../types/makeApiUrl';

import type { Actions } from './$types';
import type { components } from '../../types/api';

export const actions = {
	maintain: async ({ request }) => {
		const data = await request.formData();
		const name = data.get('name');
		const deliveryFee = data.get('deliveryFee');
		const id = data.get('id');

		const method = id ? 'PUT' : 'POST';
		const URL = id
			? makeApiUrl(`/neighborhood/{id}`, { id: id as string })
			: makeApiUrl('/neighborhood/');

		const reqData: components['schemas']['CreateNeighborhoodRequestDTO'] = {
			name: name as string,
			base_price: Number(deliveryFee)
		};

		await fetch(URL, {
			method,
			body: JSON.stringify(reqData),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		return { success: true };
	},
	delete: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');

		await fetch(makeApiUrl(`/neighborhood/{id}`, { id: id as string }), {
			method: 'DELETE'
		});

		return { success: true };
	}
} satisfies Actions;
