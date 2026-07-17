import makeApiUrl from '../types/makeApiUrl';
import type { Actions } from './$types';

export const actions = {
	delete: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');

		await fetch(makeApiUrl('/order/{id}', { id: id as string }), {
			method: 'DELETE'
		});

		return { success: true };
	}
} satisfies Actions;
