import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const repo = 'breakfast-calendar'; // ✅ GitHub repo 이름

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
		paths: {
			base: process.env.NODE_ENV === 'production' ? `/${repo}` : ''
		},
		prerender: {
			// do not prerender all pages
			entries: []
		}
	}
};

export default config;
