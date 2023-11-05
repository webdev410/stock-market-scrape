#!/usr/bin/env node
import fs from 'fs';
import initPage from './puppetteer/helpers/initPage.js';
import interceptAndSave from './puppetteer/helpers/interceptAndSave.js';
import {
	logAction,
	logInfo,
	logPink,
	logSuccess,
} from './puppetteer/helpers/logAction.js';
import wait from './puppetteer/helpers/wait.js';
import json2csv from './utils/json2Csv.js';
function readFileAndConvertCSV(name) {
	let csv = '';
	const filecontents = fs.readFileSync(`./output/${name}.json`, 'utf8');
	const data = JSON.parse(filecontents);
	if (data) {
		logInfo('data');
		csv = json2csv(data.data);
	}

	if (csv) {
		logInfo('there is data');
		fs.writeFileSync(`./output/${name}.csv`, csv);
	}
}
const init = async () => {
	logPink('hi brandon');
	const urls = [
		{
			name: 'sp500',
			url: 'https://www.barchart.com/stocks/indices/sp/sp500?orderBy=symbol&orderDir=asc&page=all',
			intercept:
				'https://www.barchart.com/proxies/core-api/v1/quotes/get?list=stocks.markets.sp500',
		},
		{
			name: 'russell2000',
			url: 'https://www.barchart.com/stocks/indices/russell/russell2000?viewName=main&page=all',
			intercept:
				'https://www.barchart.com/proxies/core-api/v1/quotes/get?list=stocks.markets.russell2000',
		},
		{
			name: 'dow',
			url: 'https://www.barchart.com/stocks/quotes/$DOWI/components?viewName=main&orderBy=symbol&orderDir=asc',
			intercept:
				'https://www.barchart.com/proxies/core-api/v1/quotes/get?lists=stocks.markets.dow',
		},
		{
			name: 'nasdaq',
			url: 'https://www.barchart.com/stocks/indices/nasdaq/nasdaq100?viewName=main&page=all',
			intercept:
				'https://www.barchart.com/proxies/core-api/v1/quotes/get?list=stocks.markets.nasdaq',
		},
	];
	const { browser, page } = await initPage();

	for (const site of urls) {
		interceptAndSave(page, site.intercept, site.name);
		logAction(`fetching url: ${site.url}`);
		await page.goto(site.url, { waitUntil: 'domcontentloaded' });
		await wait(2000);
		readFileAndConvertCSV(site.name);
	}

	await browser.close();
	logSuccess('done');
	return;
};

export default init;
