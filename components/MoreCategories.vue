<script setup lang="ts">
defineProps<{
	moreCategorie: {
		name: string;
		icon: string;
	};
}>();
</script>

<template>
	<li class="category-button">
		<span class="category-button__text">{{ moreCategorie.name }}</span>
		<img :src="moreCategorie.icon" alt="More categories Icon" class="category-button__icon" />
	</li>
</template>

<style scoped lang="scss">
.category-button {
	position: relative;
	display: inline-flex;
	align-items: center;
	justify-content: flex-start;
	padding: 1.2em 0 1.2em 1em;
	background-color: #772ce8;
	border-radius: 0.3em;
	overflow: visible;
	width: 100%;

	&__text {
		color: #fff;
		font-weight: bold;
		font-size: 1.1em;
		z-index: 1;
		margin: 0 5em 0 0;
	}

	&__icon {
		position: absolute;
		right: 0.3em;
		height: 60px;
		transform: rotate(-10deg);
		z-index: 2;
		pointer-events: none;
	}
}
</style>
