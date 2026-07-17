import type { components } from '../../types/api';
import type { Actions } from './$types';

import makeApiUrl from '../../types/makeApiUrl';

export const actions = {
	maintain: async ({ request }) => {
		const data = await request.formData();
		const name = data.get('name');
		const address = data.get('address');
		const id = data.get('id');

		const method = id ? 'PUT' : 'POST';
		const URL = id
			? makeApiUrl('/restaurant/{id}', { id: id as string })
			: makeApiUrl('/restaurant/');

		const reqData: components['schemas']['CreateRestaurantRequestDTO'] = {
			name: name as string,
			address: address as string,
			// TODO: Add CNPJ field
			CNPJ: '00.000.000/0002-00'
		};

		await fetch(URL, {
			method: method,
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

		await fetch(makeApiUrl('/restaurant/{id}', { id: id as string }), {
			method: 'DELETE'
		});

		return { success: true };
	}
} satisfies Actions;
