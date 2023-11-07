import init from './index.js';

const handleSp500 = async (req, res) => {
	const urls = [
		{
			name: 'sp500',
			url: 'https://www.barchart.com/stocks/indices/sp/sp500?orderBy=symbol&orderDir=asc&page=all',
			intercept:
				'https://www.barchart.com/proxies/core-api/v1/quotes/get?list=stocks.markets.sp500',
		},
	];
	const csv = await init(urls);
	console.log({ csv });

	return csv;
};

const handleRussell2000 = async (req, res) => {
	const urls = [
		{
			name: 'russell2000',
			url: 'https://www.barchart.com/stocks/indices/russell/russell2000?viewName=main&page=all',
			intercept:
				'https://www.barchart.com/proxies/core-api/v1/quotes/get?list=stocks.markets.russell2000',
		},
	];
	return await init(urls);
};

const handleDow = async (req, res) => {
	const urls = [
		{
			name: 'dow',
			url: 'https://www.barchart.com/stocks/quotes/$DOWI/components?viewName=main&orderBy=symbol&orderDir=asc',
			intercept:
				'https://www.barchart.com/proxies/core-api/v1/quotes/get?lists=stocks.markets.dow',
		},
	];
	return await init(urls);
};

const handleNasdaq = async (req, res) => {
	const urls = [
		{
			name: 'nasdaq',
			url: 'https://www.barchart.com/stocks/indices/nasdaq/nasdaq100?viewName=main&page=all',
			intercept:
				'https://www.barchart.com/proxies/core-api/v1/quotes/get?list=stocks.markets.nasdaq',
		},
	];
	return await init(urls);
};
export { handleSp500, handleRussell2000, handleDow, handleNasdaq };
