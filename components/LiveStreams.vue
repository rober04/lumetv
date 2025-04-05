<script setup lang="ts">
import type { Channel } from '~/types/Channel';

const NUMBER_OF_STREAMS = 4;
const props = defineProps<{ rowNumber: number; channels: Channel[] }>();
let streamsIndex = NUMBER_OF_STREAMS * props.rowNumber;
</script>

<template>
	<section class="main__livestreams livestreams">
		<h2 class="livestreams__title">
			<span class="livestreams__span">Live Channels</span> we think you'll like
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
		<div class="divider">
			<span>Show more <img src="/ArrowDownIcon.svg" alt="" /></span>
		</div>
	</section>
</template>

<style lang="scss" scoped>
.divider {
	padding: 2em 2em 0.5em 2em;
	display: flex;
	align-items: center;
	text-align: center;
	color: #199afc; // Variable para el color morado del texto

	&::before,
	&::after {
		content: '';
		flex: 1;
		border-top: 1px solid #444; // Variable para el color de las líneas
	}

	span {
		padding: 0 10px;
		font-size: 14px;
		font-weight: bold;
		cursor: pointer;
	}
}

.livestreams {
	min-height: inherit;
	&__title {
		color: #ffffff;
		font-size: 1.2em;
		padding: 1.36em 0 0.8em 15.2em;
		font-weight: 100;
	}

	&__span {
		color: #199afc;
	}
	&__list {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		flex-wrap: wrap;
		padding: 0 1.25em;
		margin-left: 17em;
	}
}
</style>
