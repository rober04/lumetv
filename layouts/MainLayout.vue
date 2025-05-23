<script setup lang="ts">
import type { Channel } from '~/types/Channel';

let channels = ref<Channel[]>([]);

onMounted(async () => {
	channels.value = await getChannels();
});

const loginWithTwitch = () => {
	const clientId = import.meta.env.VITE_TWITCH_CLIENT_ID as string;
	const redirectUri = encodeURIComponent('https://lumetv.vercel.app/auth/callback');
	const scopes = ['chat:edit', 'chat:read', 'user:read:email'];

	const url = `https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scopes.join('+')}`;
	window.location.href = url;
};
</script>
<template>
	<header class="header">
		<nav class="header__nav nav">
			<div class="nav__site">
				<img
					src="/LogoTwitch.svg"
					alt="Website's logo"
					class="nav__logo"
					onclick="location.href = '/';"
					title="Go to Index" />
				<h1 class="nav__title">LUMETV</h1>
				<img src="/MenuIcon.svg" alt="Menu icon" class="nav__menu" aria-label="Menu" />
			</div>
			<div class="nav__searchbar searchbar">
				<input type="text" name="" id="" class="searchbar__text" placeholder="Search" />
				<button type="button" class="searchbar__button">
					<img
						src="/SearchIcon.svg"
						alt="Search icon"
						class="searchbar__icon"
						aria-label="Search" />
				</button>
			</div>
			<div class="nav__user user">
				<img src="/PrimeIcon.svg" alt="Prime icon" class="user__prime" aria-label="Prime" />
				<button type="button" class="user__login" @click="loginWithTwitch">Log In</button>
				<button type="button" class="user__signup">Register</button>
				<img src="/ProfileIcon.svg" alt="User icon" class="user__profile" aria-label="Profile" />
			</div>
		</nav>
	</header>
	<aside class="sidebar">
		<div class="sidebar__header">
			<h2 class="sidebar__title">RECOMMENDED CHANNELS</h2>
			<button type="button" class="sidebar__button">
				<img
					src="/CollapseIcon.svg"
					alt="Collapse icon"
					class="sidebar__icon"
					aria-label="Collapse channels" />
			</button>
		</div>
		<ul class="sidebar__suggestedchannels suggestedchannels">
			<SuggestedChannels
				v-for="channel in channels"
				:key="channel.broadcaster_id"
				v-bind="channel" />
		</ul>
	</aside>
	<slot class="main"></slot>
</template>

<style lang="scss" scoped>
.header {
	&__nav {
		z-index: 3;
		display: flex;
		position: fixed;
		justify-content: space-between;
		height: 3.125em;
		width: 100%;
	}
}

.nav {
	background-color: #18181b;
	box-shadow:
		0em 0.0625em 0.125em rgba(0, 0, 0, 0.9),
		0em 0em 0.125em rgba(0, 0, 0, 0.9);
	&__site {
		display: flex;
		align-items: center;
		padding: 0.3125em 1.25em;
		color: white;
	}
	&__title {
		font-size: 1em;
		margin-left: 0.5em;
		font-family: Arial, Helvetica, sans-serif;
		font-weight: 600;
	}
	&__logo {
		width: 1.75em;
		transition: all 0.2s ease;
		&:hover {
			cursor: pointer;
			transform: scale(1.1);
		}
	}
	&__menu {
		margin-left: 1.75em;
		height: 1em;
		transition: all 0.2s ease;
		&:hover {
			cursor: pointer;
			transform: scale(1.1);
		}
	}
	&__searchbar {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	&__user {
		display: flex;
		align-items: center;
		justify-content: space-around;
		padding: 0.3125em 1.25em;
	}
}
.searchbar {
	&__text {
		margin: 0 auto;
		width: 23vw;
		max-width: 24em;
		height: 3em;
		background: #18181b;
		color: #dedee3;
		font-weight: 400;
		padding-left: 1em;
		box-shadow: 0px 0px 0px 0.0675em rgba(222, 222, 227, 0.4);
		border-radius: 0.375em 0px 0px 0.375em;

		&:focus {
			outline: none;
		}
	}
	&__button {
		background-color: rgb(83, 83, 95, 0.4);
		height: 3.1em;
		width: 2.5em;
		border-radius: 0px 0.375em 0.375em 0px;

		&:hover {
			background-color: rgb(83, 83, 95);
		}
	}
	&__icon {
		height: 1.5em;
	}
}

.user {
	gap: 0.5em;
	&__signup {
		background-color: #199afc;
		color: white;
		border-radius: 0.375em;
		padding: 0.625em;

		&:hover {
			background-color: #0c84ff;
		}
	}
	&__login {
		display: block;
		background-color: rgb(83, 83, 95, 0.4);
		color: white;
		border-radius: 0.375em;
		padding: 0.625em;

		&:hover {
			background-color: rgb(83, 83, 95);
		}
	}
	&__profile {
		justify-self: flex-end;
		margin-left: 0.5em;
	}
	&__prime {
		margin-right: 0.5em;
	}
}
.sidebar {
	position: fixed;
	width: 17em;
	padding: 1.9em 0 0 0;
	height: 100vh;
	color: #dedee3;
	background-color: #0f0e11;
	float: left;
	overflow-y: auto;
	top: 3.125em;
	&__header {
		display: flex;
		justify-content: space-between;
		padding: 0 1.2em 0 1.5em;
	}
	&__title {
		font-size: 0.8em;
		font-weight: 600;
		margin-bottom: 0.5em;
	}
	&__button {
		background-color: transparent;
	}
	&__icon {
		height: 1em;
	}
}
</style>
