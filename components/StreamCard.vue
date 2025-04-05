<script setup lang="ts">
import type { Channel } from '~/types/Channel';
const props = defineProps<Channel>();

const thumbnail_url = ref(props.thumbnail_url.replace('{width}x{height}', '380x210'));
</script>

<template>
	<li class="livestreams__card card">
		<NuxtLink :to="`/${props.broadcaster_name}`" class="card__thumbnail">
			<img :src="thumbnail_url" alt="Stream thumbnail" class="card__thumbnail--animation" />
		</NuxtLink>
		<article class="card__stream">
			<img :src="$props.profile_image_url" alt="Streamer logo" class="card__logo" />
			<div class="card__info">
				<NuxtLink :to="`/${props.broadcaster_name}`">
					<p class="card__title">{{ props.title }}</p>
				</NuxtLink>
				<p class="card__channel">
					{{ props.broadcaster_name }} <img src="/VerifiedIcon.svg" alt="Verified" />
				</p>
				<p class="card__game">{{ props.game_name }}</p>
				<div class="card__tags">
					<p class="card__tag" v-for="tag in props.tags" :key="tag">{{ tag }}</p>
				</div>
			</div>
		</article>
	</li>
</template>

<style lang="scss" scoped>
.card {
	&__thumbnail {
		position: relative;
		display: inline-block;
		background-color: #199afc;

		&:before,
		&:after {
			content: '';
			display: block;
			background-color: #199afc;
			width: 8px;
			height: 8px;
			position: absolute;
			transition: all 0.15s ease;
		}
		&:before {
			top: 0;
			left: 0;
			transform-origin: top left;
			transform: rotate(-45deg) scale(0);
		}
		&:after {
			right: 0;
			bottom: 0;
			transform-origin: bottom right;
			transform: rotate(45deg) scale(0);
		}
		&--animation {
			display: block;
			transform: translate(0, 0);
			transition: all 0.15s ease;
			position: relative;
			z-index: 10;
		}
		&:hover {
			cursor: pointer;
		}
		&:hover &--animation {
			transform: translate(6px, -6px);
		}
		&:hover:before {
			transform: rotate(-45deg) scale(1);
		}
		&:hover:after {
			transform: rotate(45deg) scale(1);
		}
	}
	&__stream {
		display: flex;
		width: 23.75em;
	}
	&__logo {
		border-radius: 50%;
		height: 2.8em;
		width: 2.8em;
		margin-top: 0.3em;
	}
	&__info {
		width: 20.5em;
		margin: 0.6em;
	}
	&__game,
	&__channel {
		color: #adadb8;
		font-size: 0.75em;
		font-weight: 100;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		margin-top: 0.8em;
		align-self: center;
		&:hover {
			cursor: pointer;
			color: #199afc;
		}
	}
	&__title {
		color: #ffffff;
		font-size: 0.85em;
		font-weight: 100;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;

		&:hover {
			cursor: pointer;
			color: #199afc;
		}
	}
	&__tags {
		display: flex;
		gap: 0.5em;
		margin-top: 1em;
		flex-wrap: wrap;
	}
	&__tag {
		background: rgba(83, 83, 95, 0.38);
		border-radius: 500em;
		padding: 0.2em 0.5em;
		color: #adadb8;
		font-size: 0.75em;
		align-content: center;
	}
}
</style>
