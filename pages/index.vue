<script setup lang="ts">
import LiveStreams from '~/components/LiveStreams.vue';
import { getChannels } from '#imports';
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
		<main>
			<LiveStreams class="main__livestreams" :rowNumber="0" :channels="channels" />
			<LiveStreams class="main__livestreams" :rowNumber="1" :channels="channels" />
			<LiveStreams class="main__livestreams" :rowNumber="2" :channels="channels" />
			<LiveStreams class="main__livestreams" :rowNumber="3" :channels="channels" />
		</main>
	</NuxtLayout>
</template>

<style lang="scss" scoped>
.main__livestreams {
	background-color: #0f0e11;
}
</style>
