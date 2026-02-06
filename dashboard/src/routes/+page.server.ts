import type { Actions } from './$types';

export const actions = {
	delete: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');

		await fetch(`http://localhost:3000/orders/${id}`, {
			method: 'DELETE'
		});

		return { success: true };
	}
} satisfies Actions;
