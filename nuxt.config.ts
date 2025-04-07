import { WebSocketServer } from 'ws';
import tmi from 'tmi.js';

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
		'@pinia/nuxt',
	],
	runtimeConfig: {
		twitchUser: process.env.TWITCH_USERNAME,
		twitchToken: process.env.TWITCH_TOKEN,
		twitchChannel: process.env.TWITCH_CHANNEL,
		public: {
			twitchUser: process.env.TWITCH_USERNAME,
			twitchChannel: process.env.TWITCH_CHANNEL,
		},
	},
	nitro: {
		preset: 'node',
		experimental: {
			websocket: true,
		},
	},
});
