import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit(), purgeCss()],
	build: {
		sourcemap: true
	},
	server: {
		port: 5000,
		open: true,
		host: true
	}
});
