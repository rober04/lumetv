<script setup lang="ts">
const route = useRoute();
const router = useRouter();

const config = useRuntimeConfig();

const clientId = config.public.twitchClientId as string;
const clientSecret = config.public.twitchClientSecret as string;
const redirectUri = 'http://localhost:3000/auth/callback';

onMounted(async () => {
	const code = route.query.code as string;
	if (!code) return;

	const body = new URLSearchParams({
		client_id: clientId,
		client_secret: clientSecret,
		code,
		grant_type: 'authorization_code',
		redirect_uri: redirectUri,
	});

	try {
		const tokenRes = await fetch('https://id.twitch.tv/oauth2/token', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body,
		});

		const tokenData = await tokenRes.json();
		if (!tokenData.access_token) throw new Error('Token no recibido');

		const userRes = await fetch('https://api.twitch.tv/helix/users', {
			headers: {
				'Authorization': `Bearer ${tokenData.access_token}`,
				'Client-Id': clientId,
			},
		});
		const userData = await userRes.json();
		const username = userData.data?.[0]?.login || '';

		useCookie('twitch_token', { path: '/' }).value = tokenData.access_token;
		useCookie('twitch_user', { path: '/' }).value = username;

		console.log('[Twitch] ✅ Login correcto como', username);
		router.push('/');
	} catch (err) {
		console.error('[Twitch] ❌ Error en login:', err);
	}
});
</script>

<template>
	<p>Procesando login con Twitch...</p>
</template>
