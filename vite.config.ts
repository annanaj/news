import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	return {
		define: {
			'process.env.VITE_NEWS_API_KEY': JSON.stringify(
				env.VITE_NEWS_API_KEY
			),
			'process.env.VITE_COMPANY_API_KEY': JSON.stringify(
				env.VITE_COMPANY_API_KEY
			),
			'process.env.VITE_WEATHER_API_KEY': JSON.stringify(
				env.VITE_WEATHER_API_KEY
			),
		},
		plugins: [react()],
	};
});
