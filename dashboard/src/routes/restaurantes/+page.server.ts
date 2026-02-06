import type { Actions } from './$types';

const CREATE_RESTAURANT_API_URL = 'http://localhost:3000/restaurante';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const name = data.get('name');
		const address = data.get('address');

		const reqData = {
			name,
			address
		};

		await fetch(CREATE_RESTAURANT_API_URL, {
			method: 'POST',
			body: JSON.stringify(reqData),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		return { success: true };
	}
} satisfies Actions;
