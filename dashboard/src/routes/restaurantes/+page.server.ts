import type { Actions } from './$types';

const CREATE_RESTAURANT_API_URL = 'http://localhost:3000/restaurante';
const DELETE_RESTAURANT_API_URL = 'http://localhost:3000/restaurante';

export const actions = {
	maintain: async ({ request }) => {
		const data = await request.formData();
		const name = data.get('name');
		const address = data.get('address');
		const id = data.get('id');

		const method = id ? 'PATCH' : 'POST';
		const URL = id ? `${CREATE_RESTAURANT_API_URL}/${id}` : CREATE_RESTAURANT_API_URL;

		const reqData = {
			name,
			address
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

		await fetch(DELETE_RESTAURANT_API_URL + `/${id}`, {
			method: 'DELETE'
		});

		return { success: true };
	}
} satisfies Actions;
