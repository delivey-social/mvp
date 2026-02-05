import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

import path from 'path';

import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	resolve: {
		alias: {
			$lib: path.resolve('./src/lib')
		}
	},
	ssr: {
		noExternal: ['bits-ui', 'svelte-sonner']
	}
});
