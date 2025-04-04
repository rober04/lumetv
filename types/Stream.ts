type Stream = {
	id: string;
	user_id: string;
	user_login: string;
	user_name: string;
	game_id: string;
	game_name: string;
	type: 'live' | 'vod' | 'clip'; // Asumo que puede ser 'live', 'vod' o 'clip'
	title: string;
	viewer_count: number;
	started_at: string; // Fecha en formato ISO 8601
	language: string;
	thumbnail_url: string;
	tag_ids: string[];
	tags: string[];
	is_mature: boolean;
};

export type { Stream };
