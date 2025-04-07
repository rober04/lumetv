import { TwitchApi } from '~/api/TwitchApi';
import type { User } from '~/types/User';
import type { Channel } from '~/types/Channel';

let twitchRequest: TwitchApi;
let isInitialized = false;

async function initTwitchApi() {
	if (!isInitialized) {
		twitchRequest = new TwitchApi();
		await twitchRequest.getOAuthToken();
		isInitialized = true;
	}
}

class StreamInfo {
	broadcasterLogin: string;

	constructor(broadcasterLogin: string) {
		this.broadcasterLogin = broadcasterLogin;
	}

	async getStreamInfo() {
		await initTwitchApi();

		const streamerProfile = (await this.getProfileInfo()) as unknown;

		await twitchRequest.request(
			`https://api.twitch.tv/helix/channels?broadcaster_id=${(streamerProfile as User).id}`,
		);

		const channelData = twitchRequest.data[0] as Channel;

		channelData.profile_image_url = (streamerProfile as User).profile_image_url;
		channelData.description = (streamerProfile as User).description;
		channelData.followers = await this.getFollowerInfo();

		return channelData;
	}

	async getFollowerInfo() {
		await initTwitchApi();

		const streamerProfile = (await this.getProfileInfo()) as unknown;

		await twitchRequest.request(
			`https://api.twitch.tv/helix/channels/followers?broadcaster_id=${(streamerProfile as User).id}`,
		);

		return (twitchRequest.fullData as any).total;
	}

	async getProfileInfo() {
		await initTwitchApi();

		await twitchRequest.request(
			`https://api.twitch.tv/helix/users?login=${this.broadcasterLogin}&fields=id,profile_image_url,description`,
		);

		return twitchRequest.data[0];
	}
}

export { StreamInfo };
