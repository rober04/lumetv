<script setup lang="ts">
import type { Channel } from '~/types/Channel';

const NUMBER_OF_STREAMS = 4;
const props = defineProps<{ rowNumber: number; channels: Channel[] }>();
let streamsIndex = NUMBER_OF_STREAMS * props.rowNumber;
</script>

<template>
	<section class="livestreams">
		<h2 class="livestreams__title">
			<span class="livestreams__title--blue">Live Channels</span> we think you'll like
		</h2>
		<ul class="livestreams__list">
			<StreamCard
				v-for="(channel, index) in props.channels.slice(
					streamsIndex,
					streamsIndex + NUMBER_OF_STREAMS,
				)"
				:key="channel.broadcaster_id + index"
				v-bind="channel" />
		</ul>
		<TheDivider />
	</section>
</template>

<style lang="scss" scoped>
.livestreams {
	position: relative;
	z-index: 2;
	min-height: inherit;
	&__title {
		color: #ffffff;
		font-size: 1.2em;
		font-weight: 100;
		padding: 1em 0 1em 1em;
	}

	&__title--blue {
		color: #199afc;
	}
	&__list {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		flex-wrap: wrap;
		padding: 0 1.25em;
	}
}
</style>
