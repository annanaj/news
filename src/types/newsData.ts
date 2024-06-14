export interface NewsData {
	title: string;
	summary: string;
	time_published: string;
	authors: string[] | null;
	source_domain: string;
	url: string;
	banner_image: string | null;
	ticker_sentiment: Ticker[];
	topics: Topic[];
}

interface Ticker {
	ticker: string;
	ticker_sentiment_score: number;
}

interface Topic {
	topic: string;
}
