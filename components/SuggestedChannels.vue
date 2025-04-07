<script setup lang="ts">
import type { Channel } from '~/types/Channel';

const props = defineProps<Channel>();
const NUMBER_OF_VIEWERS = 1000;
let viewerCount = props.viewer_count;
let viewerCountModified = '';

if (props.viewer_count > NUMBER_OF_VIEWERS) {
	viewerCount = props.viewer_count / 1000;
	viewerCountModified = viewerCount.toFixed(1) + 'K';
}
</script>

<template>
	<li class="suggestedchannels__channel channel">
		<img :src="$props.profile_image_url" alt="Streamer logo" class="channel__logo" />
		<div class="channel__info">
			<p class="channel__name">{{ $props.broadcaster_name }}</p>
			<p class="channel__game">{{ $props.game_name }}</p>
		</div>
		<p class="channel__viewers">
			<img src="/ViewerCountIcon.svg" alt="Red circle for viewer count" /> {{ viewerCountModified }}
		</p>
	</li>
</template>

<style lang="scss" scoped>
.channel {
	display: flex;
	justify-content: space-around;
	align-items: center;
	padding: 0.7em 1.2em 0.7em 1.5em;
	cursor: pointer;

	&:hover {
		background-color: #27272a;
	}
	&__button {
		background-color: transparent;
	}
	&__logo {
		border-radius: 50%;
		height: 2.3em;
		margin-right: 1em;
	}
	&__info {
		width: 7em;
		& p {
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
	&__name {
		color: #dedee3;
		align-content: center;
		font-weight: 100;
	}
	&__game {
		color: #adadb8;
	}
	&__viewers {
		font-size: 0.85em;
		color: #adadb8;
	}
}
</style>
