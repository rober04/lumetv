import { TwitchApi } from '~/api/TwitchApi';
import type { Channel } from '~/types/Channel';
import type { User } from '~/types/User';
import type { Stream } from '~/types/Stream';

const twitchRequest = new TwitchApi();
await twitchRequest.getOAuthToken();
await twitchRequest.request(
	'https://api.twitch.tv/helix/streams?fields=id,user_id,title,viewer_count,thumbnail_url,tags',
);
const streams = ref(twitchRequest.data as Stream[]);

const channelsCache = ref<Channel[]>([]);

async function getChannels() {
	if (channelsCache.value.length === 0) {
		const channels = ref<Channel[]>([]);

		for (let i = 0; i < streams.value.length; i++) {
			await twitchRequest.request(
				`https://api.twitch.tv/helix/channels?broadcaster_id=${streams.value[i].user_id}&fields=broadcaster_id,broadcaster_name,broadcaster_login,description,game_name,title`,
			);
			const channelData = twitchRequest.data[0] as Channel;

			await twitchRequest.request(
				`https://api.twitch.tv/helix/users?id=${streams.value[i].user_id}&fields=profile_image_url`,
			);
			channelData.profile_image_url = (twitchRequest.data[0] as User).profile_image_url;
			channelData.viewer_count = streams.value[i].viewer_count;
			channelData.thumbnail_url = streams.value[i].thumbnail_url;
			channelData.tags = streams.value[i].tags;

			channels.value.push(channelData);
		}

		channelsCache.value = channels.value;
	}

	return channelsCache.value;
}

export { getChannels };
