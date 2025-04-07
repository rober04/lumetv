<script setup lang="ts">
const moreCategories = [
	{
		name: 'Games',
		icon: '/gaming.svg',
	},
	{
		name: 'IRL',
		icon: '/irl.svg',
	},
	{
		name: 'Music & DJs',
		icon: '/music.svg',
	},
	{
		name: 'Creative',
		icon: '/creative.svg',
	},
	{
		name: 'Esports',
		icon: '/esports.svg',
	},
];

const categories = [
	{
		name: 'Just Chatting',
		viewers: '2.2M',
		icon: '/JustChatting.svg',
		tag: 'IRL',
	},
	{
		name: 'Software and Game Development',
		viewers: '35K',
		icon: '/SoftwareDevelopment.svg',
		tag: 'Software',
	},
	{
		name: 'Farming Simulator',
		viewers: '385K',
		icon: '/FarmingSimulator.svg',
		tag: 'Simulation',
	},
	{
		name: 'S.T.A.L.K.E.R 2',
		viewers: '1K',
		icon: '/Stalker2.svg',
		tag: 'Gaming',
	},
	{
		name: 'Towers of Aghasba',
		viewers: '23K',
		icon: '/TowerAghasba.svg',
		tag: 'Gaming',
	},
	{
		name: 'Flight Simulator',
		icon: '/FlightSimulator.svg',
		viewers: '12K',
		tag: 'Simulation',
	},
];
</script>

<template>
	<section class="categories">
		<h2 class="categories__title">
			<span class="categories__title--blue">Categories</span> we think you'll like
		</h2>
		<ul class="categories__list list">
			<CategoryCard
				v-for="(category, i) in categories"
				:key="category.name + i"
				:category="category" />
		</ul>
		<section class="categories__more more">
			<MoreCategories
				v-for="(moreCategorie, i) in moreCategories"
				:key="moreCategorie.name + i"
				:moreCategorie="moreCategorie" />
		</section>
	</section>
</template>

<style lang="scss" scoped>
.categories {
	position: relative;
	padding: 1.1em 1.1em 1.1em 1.1em;
	z-index: 2;
	&__title {
		font-size: 1.2em;
		font-weight: 100;
		margin: 0 0 1em 0;
		color: white;
		&--blue {
			color: #199afc;
		}
	}
}

.more {
	display: inline-flex;
	justify-content: space-between;
	width: 100%;
	gap: 3em;
}
.list {
	display: inline-flex;
	flex-direction: row;
	justify-content: space-between;
	width: 100%;
}
</style>
