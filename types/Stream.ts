import type { User } from './User';

type Stream = User & {
	id: string;
	user_id: string;
	user_name: string;
	game_name: string;
	title: string;
	viewer_count: number;
	total: number;
	thumbnail_url: string;
	started_at: string;
	tags: string[];
	followers: number;
};

export type { Stream };
