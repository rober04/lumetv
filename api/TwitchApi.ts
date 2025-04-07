class TwitchApi {
	accessToken: string = 'X';
	data: Array<unknown> = [];
	fullData: Array<unknown> = [];

	constructor() {}

	async getOAuthToken() {
		const params = new URLSearchParams({
			client_id: '9ngbnqy73cynj4m4ouiek360qx57uw',
			client_secret: 'fc97e5nn7brtelzyr5kvzrw6c0sqqo',
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

	async request<T>(url: string) {
		const twitchOptions = {
			method: 'GET',
			headers: {
				'Client-ID': '9ngbnqy73cynj4m4ouiek360qx57uw',
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

			const data = await response.json();
			this.data = data.data as T[];
			this.fullData = data as T[];
		} catch (error) {
			console.error('Error fetching Twitch user data:', (error as Error).message);
		}
	}
}

export { TwitchApi };
