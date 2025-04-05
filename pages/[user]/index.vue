<script setup lang="ts">
const route = useRoute();
</script>

<template>
	<NuxtLayout :name="'main-layout'">
		<main class="main">
			<iframe
				class="stream"
				:src="`https://player.twitch.tv/?channel=${route.params.user}&parent=localhost`"
				frameborder="0"
				allowfullscreen="true"
				scrolling="no"
				:style="{ width: '85vw', height: '85vh' }">
			</iframe>
			<iframe
				:src="`https://www.twitch.tv/embed/${route.params.user}/chat?parent=localhost`"
				:style="{ flex: 1 }"
				class="chat">
			</iframe>
		</main>
	</NuxtLayout>
</template>

<style lang="scss" scoped>
.main {
	display: flex;
	background-color: #0f0e11;
}
.chat {
	background: #0f0e11 !important;
	position: fixed;
	top: 3.125em;
	right: 0;
	height: 100vh;
	width: 20em;
}
.stream {
	height: 100vh;
	margin: 3.125em 20em 0 17em;
	width: calc(100vw - 20em);
}
</style>
