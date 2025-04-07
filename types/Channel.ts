type Channel = {
	broadcaster_id: string;
	broadcaster_name: string;
	broadcaster_login: string;
	game_name: string;
	title: string;
	profile_image_url: string;
	viewer_count: number;
	thumbnail_url: string;
	tags: string[];
	description?: string;
	followers?: number;
};

export type { Channel };
