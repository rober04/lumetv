<script setup lang="ts">
defineProps<{ msg: any }>();
function parseEmotes(message: string, emotes: Record<string, string[]> = {}) {
	if (!emotes || Object.keys(emotes).length === 0) return message;

	const emoteList: { start: number; end: number; id: string }[] = [];

	for (const id in emotes) {
		emotes[id].forEach((range) => {
			const [start, end] = range.split('-').map(Number);
			emoteList.push({ start, end, id });
		});
	}

	emoteList.sort((a, b) => b.start - a.start);

	let parsed = message;
	emoteList.forEach(({ start, end, id }) => {
		const emoteCode = parsed.slice(start, end + 1);
		const emoteUrl = `https://static-cdn.jtvnw.net/emoticons/v2/${id}/default/dark/1.0`;
		const img = `<img src="${emoteUrl}" alt="${emoteCode}" style="height: 1em; vertical-align: middle;" />`;
		parsed = parsed.slice(0, start) + img + parsed.slice(end + 1);
	});

	return parsed;
}
</script>

<template>
	<div>
		<span class="badges">
			<span v-if="msg.badges?.broadcaster">🎥</span>
			<span v-if="msg.badges?.moderator">🛡️</span>
			<span v-if="msg.badges?.vip">💎</span>
			<span v-if="msg.badges?.subscriber">⭐</span>
		</span>
		<b :style="{ color: msg.color || '#fff' }">{{ msg.user }}: </b>
		<span v-html="parseEmotes(msg.message, msg.emotes)" class="message"></span>
	</div>
</template>

<style lang="scss" scoped>
.message {
	overflow-wrap: break-word;
}
</style>
