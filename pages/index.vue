<script setup lang="ts">
import { TwitchApi } from '~/api/TwitchApi';
const twitch = new TwitchApi('https://api.twitch.tv/helix/games/top');
twitch.twitchRequest();
definePageMeta({
	layout: 'header-layout',
});
</script>

<template>
	<NuxtLayout :name="'header-layout'" />
</template>

<style lang="scss" scoped></style>
