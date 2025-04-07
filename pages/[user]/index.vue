<script setup lang="ts">
import { StreamInfo } from '#imports';

const route = useRoute();
const user = route.params.user as string;

const streamerInfo = new StreamInfo(user);
const streamerInfoData = await streamerInfo.getStreamInfo();

let followerCount = streamerInfoData.followers;
let followerCountModified = '';

const THOUSAND_FORMATTER = 1000;
const MILLION_FORMATTER = 1000000;
if ((streamerInfoData.followers as number) > MILLION_FORMATTER) {
	followerCount = (followerCount as number) / MILLION_FORMATTER;
	followerCountModified = followerCount.toFixed(1) + 'M';
} else if ((streamerInfoData.followers as number) > THOUSAND_FORMATTER) {
	followerCount = (followerCount as number) / THOUSAND_FORMATTER;
	followerCountModified = followerCount.toFixed(1) + 'K';
}
</script>

<template>
	<NuxtLayout :name="'main-layout'">
		<main class="main">
			<iframe
				class="main__stream"
				:src="`https://player.twitch.tv/?channel=${route.params.user}&parent=localhost`"
				frameborder="0"
				allowfullscreen="true"
				scrolling="no"
				:style="{ height: '75vh' }">
			</iframe>
			<article class="main__info info">
				<img class="info__avatar" :src="streamerInfoData.profile_image_url" alt="Streamer avatar" />
				<div class="info__text">
					<header class="info__header">
						<h1 class="info__streamer">
							{{ streamerInfoData.broadcaster_name }}
						</h1>
						<div class="info__buttons">
							<button class="info__follow">
								<img src="/FollowIcon.svg" alt="Follow icon" />
								Follow
							</button>
							<button class="info__subscribe">
								<img src="/SubscribeIcon.svg" alt="Subscribe icon" />
								Subscribe
								<img src="/SubscribeDownIcon.svg" alt="Subscribe down icon" />
							</button>
						</div>
					</header>
					<p class="info__description">{{ streamerInfoData.title }}</p>
					<p class="info__game">{{ streamerInfoData.game_name }}</p>
					<div class="tags">
						<span v-for="(tag, i) in streamerInfoData.tags" :key="i" class="tag">{{ tag }}</span>
					</div>
				</div>
			</article>
			<footer class="info__about about">
				<span class="about__title">About {{ streamerInfoData.broadcaster_name }}</span>
				<div class="about__info">
					<span class="about__followers"
						><span class="about__followers--white">{{ followerCountModified }}</span>
						followers</span
					>
					<span class="about__description">{{ streamerInfoData.description }}</span>
					<div class="divider"></div>
					<div class="about__socials socials">
						<button class="socials__button">
							<img src="/YoutubeIcon.svg" alt="Youtube icon" />YouTube
						</button>
						<button class="socials__button">
							<img src="/InstagramIcon.svg" alt="Instagram icon" />Instagram
						</button>
						<button class="socials__button">
							<img src="/TwitterIcon.svg" alt="Twitter icon" />Twitter
						</button>
						<button class="socials__button">
							<img src="/TiktokIcon.svg" alt="TikTok icon" />TikTok
						</button>
					</div>
				</div>
			</footer>
			<TwitchChat class="main__chat" :channel="user"></TwitchChat>
		</main>
	</NuxtLayout>
</template>

<style scoped lang="scss">
.main {
	display: flex;
	background-color: #0f0e11;
	flex-direction: column;

	&__stream {
		margin: 3.125em 23em 0 17em;
	}
}
.divider {
	padding: 1.5em 0 1.5em 0;
	display: flex;
	align-items: center;
	text-align: center;
	color: #199afc;

	&::before,
	&::after {
		content: '';
		flex: 1;
		border-top: 1px solid #444;
	}

	span {
		padding: 0 10px;
		font-size: 14px;
		font-weight: bold;
		cursor: pointer;
	}
}
.info {
	padding: 2em 23em 0 17em;
	display: flex;
	align-items: center;
	margin-left: 0.5em;
	&__streamer {
		color: #ffffff;
		font-size: 1.3em;
		align-self: center;
		&:hover {
			cursor: pointer;
			color: #b9b9b9;
		}
	}

	&__description,
	&__game {
		color: #ffffff;
		margin-bottom: 0.5em;
		font-size: 0.85em;
	}
	&__description {
		margin-top: 0.4em;
	}
	&__game {
		color: #199afc;
		justify-self: flex-start;
		&:hover {
			cursor: pointer;
			color: #0c84ff;
		}
	}

	&__avatar {
		width: 5em;
		height: 5em;
		border-radius: 50%;
	}
	&__follow {
		background-color: #199afc;
		color: #ffffff;
		display: flex;
		align-items: center;
		gap: 0.5em;
		padding: 0.5em;
		font-size: 1.1em;
		&:hover {
			background: #0c84ff;
		}
	}
	&__subscribe {
		display: flex;
		align-items: center;
		background-color: rgb(83, 83, 95, 0.4);
		color: #ffffff;
		gap: 0.5em;
		padding: 0.5em;
		font-size: 1.1em;
		&:hover {
			background-color: rgb(83, 83, 95);
		}
	}
	&__header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	&__buttons {
		display: flex;
		flex-direction: row;
		gap: 0.7em;
		margin-right: 1em;
	}
	&__text {
		justify-self: stretch;
		width: 100%;
		margin-left: 1em;
	}
}

.about {
	padding: 2em 23em 0 17em;
	display: flex;
	margin-left: 0.8em;
	flex-direction: column;
	&__title {
		color: #ffffff;
		font-size: 1.1em;
	}
	&__followers {
		color: rgba(173, 173, 184, 1);
		&--white {
			font-weight: bold;
			color: #ffffff;
		}
	}
	&__info {
		background-color: rgba(24, 24, 27, 1);
		border-radius: 0.25em;
		padding: 1em;
		margin-top: 1.5em;
		display: flex;
		flex-direction: column;
		color: rgba(239, 239, 241, 1);
	}
	&__description {
		margin-top: 1.3em;
	}
	&__socials {
		display: flex;
		flex-direction: row;
		gap: 1em;
	}
}
.tags {
	display: flex;
	gap: 0.5em;
	margin-top: 1em;
	flex-wrap: wrap;
}
.tag {
	background: rgba(83, 83, 95, 0.38);
	border-radius: 500em;
	padding: 0.2em 0.5em;
	color: #adadb8;
	font-size: 0.75em;
	align-content: center;
}
.socials {
	&__button {
		display: flex;
		align-items: center;
		background-color: transparent;
		color: rgba(239, 239, 241, 1);
		gap: 0.5em;
		padding: 0.3em;
		&:hover {
			background-color: rgb(83, 83, 95, 0.4);
		}
	}
}
</style>
