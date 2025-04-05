// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-11-01',
	devtools: { enabled: true },

	css: ['~/assets/reset.scss'],
	app: {
		head: {
			script: [
				{
					src: 'https://embed.twitch.tv/embed/v1.js',
				},
			],
		},
	},

	modules: [
		'@nuxt/content',
		'@nuxt/eslint',
		'@nuxt/fonts',
		'@nuxt/icon',
		'@nuxt/image',
		'@nuxt/scripts',
		'@nuxt/test-utils',
		'@nuxt/ui',
	],
});
