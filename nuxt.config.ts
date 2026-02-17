// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2025-07-15",
	devtools: { enabled: true },
	modules: ["@nuxt/ui", '@pinia/nuxt'],
	css: ["~/assets/css/main.css"],
	runtimeConfig: {
		public: {
			apiBase: 'http://localhost:59001',
			imgCDN: 'https://admin.spetsov.ru/public/products',
			imgPreviewCDN: 'https://admin.spetsov.ru/public/products_preview',
			imgCatCDN: 'https://admin.spetsov.ru/public/categories',
			imgCatPreviewCDN: 'https://admin.spetsov.ru/public/categories_preview',
		},
	},
	// routeRules: {
		// "/products/**": { cache: { maxAge: 60 * 60 * 24 } },
	// }
});
