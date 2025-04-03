<script setup lang="ts"></script>
<template>
	<header class="header">
		<nav class="header__nav nav">
			<div class="nav__site">
				<img
					src="/LogoTwitch.svg"
					alt="Website's logo"
					class="nav__logo"
					onclick="location.href = '/';"
					title="Index" />
				<h1 class="nav__title">LUMETV</h1>
				<img src="/MenuIcon.svg" alt="Menu icon" class="nav__menu" aria-label="Menu" />
			</div>
			<div class="nav__searchbar searchbar">
				<input type="text" name="" id="" class="searchbar__text" placeholder="Search" />
				<button type="button" class="searchbar__button">
					<img src="/SearchIcon.svg" alt="" class="searchbar__icon" />
				</button>
			</div>
			<div class="nav__user user">
				<img src="/PrimeIcon.svg" alt="" class="user__prime" />
				<button type="button" class="user__login">Log In</button>
				<button type="button" class="user__signup">Register</button>
				<img src="/ProfileIcon.svg" alt="" class="user__profile" />
			</div>
		</nav>
	</header>
</template>

<style lang="scss" scoped>
.header {
	&__nav {
		display: flex;
		justify-content: space-between;
		height: 3.125em;
	}
}

.nav {
	background-color: #18181b;
	box-shadow:
		0px 1px 2px rgba(0, 0, 0, 0.9),
		0px 0px 2px rgba(0, 0, 0, 0.9);
	&__site {
		display: flex;
		align-items: center;
		padding: 0.3125em 1.25em;
		color: white;
	}
	&__title {
		font-size: 0.75em;
		margin-left: 0.5em;
		font-family: Arial, Helvetica, sans-serif;
		font-weight: 600;
	}
	&__logo {
		width: 1.75em;
	}
	&__menu {
		color: white;
		margin-left: 1.75em;
		height: 1em;
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
		width: 24.375em;
		height: 3em;
		background: #18181b;
		color: white;
		font-weight: 400;
		padding-left: 1em;
		box-shadow: inset 0px 0px 0px 0.0675em rgba(222, 222, 227, 0.4);
		border-radius: 0.375em 0px 0px 0.375em;

		&:focus {
			outline: none;
		}
	}
	&__button {
		background-color: rgb(83, 83, 95, 0.4);
		height: 3em;
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
</style>
