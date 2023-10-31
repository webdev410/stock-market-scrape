import initPage from './puppetteer/helpers/initPage.js';
import interceptAndSave from './puppetteer/helpers/interceptAndSave.js';
import { logAction, logPink } from './puppetteer/helpers/logAction.js';

const init = async () => {
	logPink('hi brandon');
	const urls = [
		'https://www.barchart.com/stocks/indices/sp/sp500',
		'https://www.barchart.com/stocks/indices/sp/sp500?orderBy=symbol&orderDir=asc&page=all',
	];
	const { browser, page } = await initPage();
	const interceptUrl =
		'https://www.barchart.com/proxies/core-api/v1/quotes/get?list=stocks.markets.sp500';

	const sp500Data = interceptAndSave(page, interceptUrl);
	logAction(`fetching url: ${urls[1]}`);
	await page.goto(urls[1]);

	if (sp500Data) {
		logPink('sp500Data');
		logPink(sp500Data);
	}

	// await getSP500();
	await browser.close();
	return;
};

init();
