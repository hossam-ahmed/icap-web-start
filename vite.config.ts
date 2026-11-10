import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
	plugins: [
		react(),
		tailwindcss()
	],
	resolve: {
		alias: {
			'@features': fileURLToPath(new URL('./src/features', import.meta.url)),
			'@shared': fileURLToPath(new URL('./src/shared', import.meta.url)),
			'@core': fileURLToPath(new URL('./src/core', import.meta.url)),
			'@assets': fileURLToPath(new URL('./src/assets', import.meta.url))
		}
	},
	mode   : ''
})
