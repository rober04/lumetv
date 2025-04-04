import { TwitchApi } from '~/api/TwitchApi';
import type { Channel } from '~/types/Channel';
import type { User } from '~/types/User';
import type { Stream } from '~/types/Stream';

const twitchRequest = new TwitchApi();
await twitchRequest.request('https://api.twitch.tv/helix/streams');
const streams = ref(twitchRequest.data as Stream[]);

const channels = ref<Channel[]>([]);

for (let i = 0; i < streams.value.length; i++) {
	await twitchRequest.request(
		`https://api.twitch.tv/helix/channels?broadcaster_id=${streams.value[i].user_id}`,
	);

	const channelData = twitchRequest.data[0] as Channel;

	await twitchRequest.request(`https://api.twitch.tv/helix/users?id=${streams.value[i].user_id}`);
	channelData.profile_image_url = (twitchRequest.data[0] as User).profile_image_url;
	channelData.viewer_count = streams.value[i].viewer_count;

	channels.value.push(channelData);
}

export { channels };
