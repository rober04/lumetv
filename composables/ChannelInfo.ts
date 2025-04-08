import { TwitchApi } from '~/api/TwitchApi';
import type { Channel } from '~/types/Channel';
import type { User } from '~/types/User';
import type { Stream } from '~/types/Stream';

const twitchRequest = new TwitchApi();
let streamsCache: Stream[] = [];
const channelsCache = ref<Channel[]>([]);

async function initTwitchApi() {

	await twitchRequest.getOAuthToken();

	await twitchRequest.request(
		'https://api.twitch.tv/helix/streams?fields=id,user_id,title,viewer_count,thumbnail_url,tags',
	);

	streamsCache = twitchRequest.data as Stream[];
}

async function getChannels() {
	if (channelsCache.value.length === 0) {
		if (!streamsCache.length) {
			await initTwitchApi();
		}

		const channels = ref<Channel[]>([]);

		for (let i = 0; i < streamsCache.length; i++) {
			const userId = streamsCache[i].user_id;

			await twitchRequest.request(
				`https://api.twitch.tv/helix/channels?broadcaster_id=${userId}&fields=broadcaster_id,broadcaster_name,broadcaster_login,description,game_name,title`,
			);
			const channelData = twitchRequest.data[0] as Channel;

			await twitchRequest.request(
				`https://api.twitch.tv/helix/users?id=${userId}&fields=profile_image_url`,
			);
			channelData.profile_image_url = (twitchRequest.data[0] as User).profile_image_url;
			channelData.viewer_count = streamsCache[i].viewer_count;
			channelData.thumbnail_url = streamsCache[i].thumbnail_url;
			channelData.tags = streamsCache[i].tags;

			channels.value.push(channelData);
		}

		channelsCache.value = channels.value;
	}

	return channelsCache.value;
}

export { getChannels };
