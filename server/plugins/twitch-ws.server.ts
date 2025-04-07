import { WebSocketServer } from 'ws';
import tmi from 'tmi.js';

declare module 'ws' {
	interface WebSocket {
		channel?: string;
	}
}

export default defineNitroPlugin(() => {});
