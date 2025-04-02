import * as request from 'request';

class TwitchApi {
	url: string;
	accessToken: string = '';

	constructor(url: string) {
		this.url = url;
	}

	getAccessToken() {
		const options = {
			url: 'https://id.twitch.tv/oauth2/token',
			json: true,
			body: {
				client_id: 'w90oqmu9u0of2vsh0xnv6qxivn8bko',
				client_secret: '548agyhmyp8eca5cc7xvyi6jcsn2t8',
				grant_type: 'client_credentials',
			},
		};

		request.post(options, (err, res, body) => {
			if (err) {
				return console.log(err);
			}
			this.accessToken = body.access_token;
		});
	}
	twitchRequest() {
		setTimeout(() => {
			const twitchOptions = {
				url: this.url,
				method: 'GET',
				headers: {
					'Client-ID': 'w90oqmu9u0of2vsh0xnv6qxivn8bko',
					'Authorization': 'Bearer ' + this.accessToken,
				},
			};
			if (!this.accessToken) {
				console.error('No Token');
			} else {
				const twitchRequest = request.get(twitchOptions, (err, res, body) => {
					if (err) {
						return console.log(err);
					}
				});
			}
		}, 2000);
	}
}

export { TwitchApi };
