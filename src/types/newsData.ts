export interface NewsData {
	title: string,
	summary: string,
	time_published: string,
	authors: string[] | null,
	url: string,
	banner_image: string | null,
	topics: Topic[],
}

interface Topic {
	topic: string,
	relevance_score: number,
}
