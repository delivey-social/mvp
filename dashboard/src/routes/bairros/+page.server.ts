import type { Actions } from './$types';

const CREATE_NEIGHBORHOOD_API_URL = 'http://localhost:3000/neighborhoods';

export const actions = {
	maintain: async ({ request }) => {
		const data = await request.formData();
		const name = data.get('name');
		const deliveryFee = data.get('deliveryFee');
		const id = data.get('id');

		const method = id ? 'PATCH' : 'POST';
		const URL = id ? `${CREATE_NEIGHBORHOOD_API_URL}/${id}` : CREATE_NEIGHBORHOOD_API_URL;

		const reqData = {
			name,
			deliveryFee
		};

		await fetch(URL, {
			method,
			body: JSON.stringify(reqData),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		return { success: true };
	}
} satisfies Actions;
