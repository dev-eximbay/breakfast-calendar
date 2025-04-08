import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			// default
			fallback: 'index.html',
			// do not use server-side rendering
			ssr: false
		}),
		prerender: {
			// do not prerender all pages
			entries: []
		}
	}
};

export default config;
