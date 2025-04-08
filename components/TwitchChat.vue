<script setup lang="ts">
const props = defineProps<{ channel: string }>();
const messages = ref<any[]>([]);
const input = ref('');
const bottomRef = ref<HTMLElement | null>(null);
const scrollContainerRef = ref<HTMLElement | null>(null);
let ws: WebSocket;

const shouldAutoScroll = ref(true);
const hasNewMessages = ref(false);

const twitchUser = useCookie('twitch_user').value;
const twitchToken = useCookie('twitch_token').value;
const GAP_FROM_BOTTOM = 150;

interface ChatPayload {
	type: 'chat';
	channel: string;
	message: string;
	badges: any;
	username?: string;
	token?: string;
}

const isAtBottom = () => {
	if (!scrollContainerRef.value) return true;
	const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.value;
	return scrollHeight - scrollTop - clientHeight < GAP_FROM_BOTTOM;
};

const handleScroll = () => {
	shouldAutoScroll.value = isAtBottom();
	if (shouldAutoScroll.value) {
		hasNewMessages.value = false;
	}
};

onMounted(() => {
	ws = new WebSocket(`wss://lumetv-backend.onrender.com?channel=${props.channel}`);

	ws.onopen = () => console.log('[WS] ✅ Conectado');
	ws.onmessage = (e) => {
		const data = JSON.parse(e.data);
		if (!data.message) return;
		if (data.channel.toLowerCase() !== props.channel.toLowerCase()) return;

		if (data.user?.toLowerCase() === twitchUser?.toLowerCase() && !data.fromOverlay) {
			return;
		}

		messages.value.push(data);
	};

	scrollContainerRef.value?.addEventListener('scroll', handleScroll);
});

watch(messages.value, () => {
	nextTick(() => {
		if (shouldAutoScroll.value && bottomRef.value) {
			bottomRef.value.scrollIntoView({ behavior: 'smooth' });
		} else {
			hasNewMessages.value = true;
		}
	});
});

const scrollToBottom = () => {
	shouldAutoScroll.value = true;
	hasNewMessages.value = false;
	nextTick(() => {
		bottomRef.value?.scrollIntoView({ behavior: 'smooth' });
	});
};

const sendMessage = () => {
	if (input.value.trim()) {
		const messagePayload: ChatPayload = {
			type: 'chat',
			channel: props.channel,
			message: input.value.trim(),
			badges: { overlay: true },
		};

		if (twitchUser && twitchToken) {
			messagePayload.username = twitchUser;
			messagePayload.token = twitchToken.startsWith('oauth:')
				? twitchToken
				: `oauth:${twitchToken}`;
		}

		ws.send(JSON.stringify(messagePayload));
		input.value = '';
	}
};
</script>

<template>
	<article class="chat">
		<header class="chat__header header">
			<img src="/CollapseIcon.svg" alt="Collapse icon" aria-label="Collapse" class="header__icon" />
			<h2 class="header__title">STREAM CHAT</h2>
			<img src="/ChatViewersIcon.svg" alt="Close icon" aria-label="Close" class="header__icon" />
		</header>

		<main ref="scrollContainerRef" class="chat__messages messages">
			<div v-for="(msg, i) in messages" :key="i" class="messages__message">
				<TwitchMessage :msg="msg" />
			</div>
			<div ref="bottomRef" style="height: 1px" />
		</main>

		<button v-if="hasNewMessages" class="chat__scroll-button" @click="scrollToBottom">
			↓ New Messages
		</button>

		<input
			class="chat__input"
			v-model="input"
			@keyup.enter="sendMessage"
			placeholder="Send a message" />

		<div class="chat__bottom">
			<div class="chat__bits bits">
				<img src="/BitsIcon.svg" alt="Bits icon" aria-label="Bits" />
				<span class="bits__amount">0</span>
			</div>
			<div class="chat__actions">
				<img
					src="/SettingsIcon.svg"
					alt="Settings icon"
					class="chat__settings"
					aria-label="Settings" />
				<button @click="sendMessage" class="chat__button">Chat</button>
			</div>
		</div>
	</article>
</template>

<style scoped lang="scss">
.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: #18181b;
	color: #dedee3;
	font-size: 0.6em;
	padding: 0.8em;
	&__title {
		font-weight: 100;
	}
	&__icon {
		cursor: pointer;
		transform: scaleX(-1);
		padding: 1em;
		border-radius: 0.25em;
		&:hover {
			background-color: rgb(83, 83, 95, 0.4);
		}
	}
}
.chat {
	background: #0f0e11;
	position: fixed;
	right: 0;
	height: calc(100vh - 3.125em);
	width: 23em;
	top: 3.125em;
	display: flex;
	flex-direction: column;

	&__messages {
		color: white;
		padding: 1.5em 1.5em 0.3em 1.5em;
		font-size: 0.85em;
		overflow-y: auto;
		flex: 1;
		scroll-behavior: smooth;
	}

	&__input {
		height: 3em;
		background: #18181b;
		color: #dedee3;
		font-weight: 400;
		padding-left: 1em;
		box-shadow: 0px 0px 0px 0.0675em rgba(222, 222, 227, 0.4);
		border-radius: 0.375em;
		border: none;
		width: 90%;
		align-self: center;
	}
	&__bottom {
		margin: 0.5em 1.1em 0.5em 0;
		align-self: flex-end;
		display: flex;
		gap: 0.8em;
		justify-content: space-between;
		align-items: center;
		width: 90%;
	}
	&__bits {
		cursor: pointer;
		padding: 0.2em;
		border-radius: 0.25em;
		display: flex;
		align-items: center;
		&:hover {
			background-color: rgb(83, 83, 95, 0.4);
		}
	}
	&__actions {
		display: flex;
		gap: 0.8em;
	}

	&__settings {
		cursor: pointer;
		align-self: center;
		padding: 0.2em;
		border-radius: 0.25em;
		&:hover {
			background-color: rgb(83, 83, 95, 0.4);
		}
	}

	&__button {
		background: #199afc;
		color: white;
		height: 2.3em;
		width: 4em;

		&:hover {
			background: #0c84ff;
		}
	}
	&__scroll-button {
		background: #199afc;
		color: white;
		border: none;
		border-radius: 0.5em;
		padding: 0.5em 1em;
		width: 90%;
		align-self: center;
		margin-bottom: 1em;
		cursor: pointer;
		box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
		transition: background 0.2s ease;
		z-index: 10;

		&:hover {
			background: #0c84ff;
		}
	}
}

.messages {
	&__message {
		margin-bottom: 1em;
	}
}
.bits {
	&__amount {
		color: #ffffff;
		font-size: 0.8em;
		margin-left: 0.5em;
		padding-right: 0.3em;
	}
}
</style>
