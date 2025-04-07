<script setup lang="ts"></script>

<template>
	<div class="divider">
		<span>Show more <img src="/ArrowDownIcon.svg" alt="Down arrow icon" /></span>
	</div>
</template>

<style lang="scss" scoped>
.divider {
	padding: 2em 2em 0 2em;
	display: flex;
	align-items: center;
	text-align: center;
	color: #199afc;

	&::before,
	&::after {
		content: '';
		flex: 1;
		border-top: 0.0625em solid #444;
	}

	span {
		padding: 0 0.625em;
		font-size: 0.875em;
		font-weight: bold;
		cursor: pointer;
	}
}
</style>
