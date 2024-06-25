interface TickerProps {
	ticker: Array<{ ticker: string; ticker_sentiment_score: number }>;
}

export default function Ticker({ ticker }: TickerProps) {
	return (
		<div className="space-x-2">
			{ticker.map((item) => (
				<span
					className="rounded-full bg-indigo-500 px-4 py-2 text-xs text-white"
					key={`${item.ticker}-${item.ticker_sentiment_score}`}
				>
					{item.ticker}
				</span>
			))}
		</div>
	);
}
