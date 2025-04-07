import { WebSocketServer } from 'ws';
import tmi from 'tmi.js';
import 'dotenv/config';

declare module 'ws' {
	interface WebSocket {
		channel?: string;
	}
}

const config = {
	twitchUser: process.env.TWITCH_USERNAME,
	twitchToken: process.env.TWITCH_TOKEN,
};

if (!config.twitchUser || !config.twitchToken) {
	console.error('[TMI] ❌ Falta twitchUser o twitchToken en runtimeConfig');
}

const wss = new WebSocketServer({ port: 8080 });
console.log('[WS] ✅ WebSocket server iniciado en puerto 8080');

const twitchClients = new Map<string, tmi.Client>();

wss.on('connection', async (socket, req) => {
	const url = new URL(req.url || '', `http://${req.headers.host}`);
	const channel = url.searchParams.get('channel');

	if (!channel) {
		console.warn('[WS] ⚠️ No se proporcionó canal en la conexión');
		socket.close();
		return;
	}

	const normalizedChannel = channel.toLowerCase();
	socket.channel = normalizedChannel;

	console.log(`[WS] ✅ Cliente conectado para canal: ${normalizedChannel}`);

	let botClient = twitchClients.get(normalizedChannel);

	if (!botClient) {
		botClient = new tmi.Client({
			connection: { secure: true, reconnect: true },
			identity: {
				username: config.twitchUser,
				password: config.twitchToken,
			},
			channels: [normalizedChannel],
		});

		try {
			await botClient.connect();
			console.log(`[TMI] 📡 Bot conectado a ${normalizedChannel}`);
		} catch (err) {
			console.error(`[TMI] ❌ Error al conectar bot para ${normalizedChannel}:`, err);
			socket.close();
			return;
		}

		botClient.on('message', (_channel, tags, message, self) => {
			if (self) return;

			const escapeHTML = (text: string) => text.replace(/</g, '&lt;').replace(/>/g, '&gt;');

			const safeMessage = escapeHTML(message);
			const payload = {
				user: tags['display-name'] || tags.username,
				message: safeMessage,
				channel: _channel.replace('#', '').toLowerCase(),
				color: tags.color || '#ccc',
				badges: tags.badges || {},
				emotes: tags.emotes || {},
			};

			console.log(`[SERVER] 🔵 (#${payload.channel}) ${payload.user}: ${safeMessage}`);

			wss.clients.forEach((clientSocket) => {
				if (clientSocket.readyState === 1 && clientSocket.channel === payload.channel) {
					clientSocket.send(JSON.stringify(payload));
				}
			});
		});

		twitchClients.set(normalizedChannel, botClient);
	}

	socket.on('message', async (raw) => {
		try {
			const data = JSON.parse(raw.toString());

			if (data.type === 'chat') {
				const payload = {
					user: data.username || config.twitchUser,
					message: data.message,
					channel: normalizedChannel,
					color: '#00ff88',
					badges: data.badges || { overlay: true },
					emotes: {},
					fromOverlay: true,
				};

				wss.clients.forEach((clientSocket) => {
					if (clientSocket.readyState === 1 && clientSocket.channel === normalizedChannel) {
						clientSocket.send(JSON.stringify(payload));
					}
				});

				if (data.username && data.token) {
					const userClient = new tmi.Client({
						connection: { secure: true, reconnect: false },
						identity: {
							username: data.username,
							password: data.token,
						},
						channels: [normalizedChannel],
					});

					try {
						await userClient.connect();
						await userClient.say(normalizedChannel, data.message);
						console.log(`[TMI] ✅ Mensaje enviado como ${data.username}`);
						await userClient.disconnect();
						return;
					} catch (err) {
						console.error(`[TMI] ❌ Error enviando como ${data.username}:`, err);
						await botClient?.say(normalizedChannel, data.message);
					}
				} else {
					console.warn('[WS] ⚠️ Mensaje recibido sin autenticación, ignorado');
				}
			}
		} catch (e) {
			console.error('[WS] ❌ Error procesando mensaje:', e);
		}
	});

	socket.on('close', () => {
		console.log(`[WS] ❎ Socket cerrado para canal: ${normalizedChannel}`);
	});
});
