<script setup lang="ts">
defineProps<{
	category: {
		name: string;
		viewers: string;
		icon: string;
		tag: string;
	};
}>();
</script>

<template>
	<article class="list__category category">
		<img class="category__image" :src="category.icon" alt="Category image" />
		<main class="category__info">
			<p class="category__name">{{ category.name }}</p>
			<span class="category__viewers">{{ category.viewers }} viewers</span>
			<div class="category__tags">
				<span class="category__tag">{{ category.tag }}</span>
			</div>
		</main>
	</article>
</template>

<style lang="scss" scoped>
.category {
	&__image {
		width: 15em;
	}
	&__tag {
		background: rgba(83, 83, 95, 0.38);
		border-radius: 500em;
		padding: 0.2em 0.5em;
		color: #adadb8;
		font-size: 0.75em;
		align-content: center;
	}
	& p,
	span {
		color: white;
	}
	&__info {
		display: flex;
		gap: 0.5em;
		flex-direction: column;
		margin: 0 0 1em 0;
	}
}
</style>
