import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({

	resolve: {
		alias: {
			'@style': '/src/style',
			'@component': '/src/components',
			'@context': '/src/context',
			'@public': '/public',
			'@models': '/src/models'

		}
	},
	plugins: [
		react(),
	],
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@import './src/style/style.scss';`,
				//api: 'modern-compiler' // or "modern"
			},
		},
	},
})
