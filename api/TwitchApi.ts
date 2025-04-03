class TwitchApi {
	accessToken: string = 'X';
	url: string;

	constructor(url: string) {
		this.url = url;
		this.init();
	}

	async init() {
		await this.getOAuthToken();
		console.log('OAuth Token:', this.accessToken);
		console.log(await this.twitchRequest());
	}

	async getOAuthToken() {
		const params = new URLSearchParams({
			client_id: '9ngbnqy73cynj4m4ouiek360qx57uw',
			client_secret: 'p3w7nfu39sweayk0cr941hsiszgvp5',
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

			const data = await response.json();
			this.accessToken = data.access_token;
		} catch (error) {
			console.error('Error fetching OAuth token:', error);
		}
	}

	async twitchRequest() {
		const twitchOptions = {
			method: 'GET',
			headers: {
				'Client-ID': '9ngbnqy73cynj4m4ouiek360qx57uw',
				'Authorization': `Bearer ${this.accessToken}`,
			},
		};

		try {
			const response = await fetch(this.url, twitchOptions);

			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(
					`HTTP error! Status: ${response.status} - ${response.statusText}\n${errorText}`,
				);
			}

			const data = await response.json();
			return data;
		} catch (error) {
			console.error('Error fetching Twitch user data:', error);
		}
	}
}

export { TwitchApi };
