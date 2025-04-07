<script setup lang="ts">
import type { Channel } from '~/types/Channel';

let channels = ref<Channel[]>([]);

onMounted(async () => {
	channels.value = await getChannels();
});

definePageMeta({
	layout: 'main-layout',
});
</script>

<template>
	<NuxtLayout :name="'main-layout'">
		<main class="main-page">
			<LiveStreams class="main-page__livestreams" :rowNumber="0" :channels="channels" />
			<LiveStreams class="main-page__livestreams" :rowNumber="1" :channels="channels" />
			<TheCategories class="main-page__categories"></TheCategories>
			<LiveStreams class="main-page__livestreams" :rowNumber="2" :channels="channels" />
			<LiveStreams class="main-page__livestreams" :rowNumber="3" :channels="channels" />
		</main>
	</NuxtLayout>
</template>

<style lang="scss" scoped>
.main-page {
	margin: 0 0 0 17em;
	padding: 3.125em 0 0 0;
	&__livestreams,
	&__categories {
		background-color: #0f0e11;
	}
}
</style>
