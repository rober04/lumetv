class TwitchApi {
	accessToken: string = 'X';
	data: Array<unknown> = [];
	fullData: Array<unknown> = [];

	constructor() {}

	async getOAuthToken() {
		const params = new URLSearchParams({
			client_id: import.meta.env.VITE_TWITCH_CLIENT_ID as string,
			client_secret: import.meta.env.VITE_TWITCH_CLIENT_SECRET as string,
			grant_type: 'client_credentials',
		});

		try {
			const response = await fetch('https://id.twitch.tv/oauth2/token', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: params,
			});

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
			}

			const data = (await response.json()) as { access_token: string };
			this.accessToken = data.access_token;
		} catch (error) {
			console.error('Error fetching OAuth token:', error);
		}
	}

	async request<T>(url: string) {
		const twitchOptions = {
			method: 'GET',
			headers: {
				'Client-ID': import.meta.env.VITE_TWITCH_CLIENT_ID as string,
				'Authorization': `Bearer ${this.accessToken}`,
			},
		};

		try {
			const response = await fetch(url, twitchOptions);

			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(
					`HTTP error! Status: ${response.status} - ${response.statusText}\n${errorText}`,
				);
			}

			const data: any = await response.json();
			this.data = data.data;
			this.fullData = data;
		} catch (error) {
			console.error('Error fetching Twitch user data:', (error as Error).message);
		}
	}
}

export { TwitchApi };
