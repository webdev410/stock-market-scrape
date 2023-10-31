import axios from 'axios';
import { load } from 'cheerio';
import fs, { writeFileSync } from 'fs';
import initPage from './puppetteer/helpers/initPage.js';
import intercept from './puppetteer/helpers/intercept.js';
import json2csv from './utils/json2Csv.js';
import { logAction, logPink } from './puppetteer/helpers/logAction.js';
const init = async () => {
	logPink('hi brandon');
	const urls = [
		'https://www.barchart.com/stocks/indices/sp/sp500',
		'https://www.barchart.com/stocks/indices/sp/sp500?orderBy=symbol&orderDir=asc&page=all',
	];
	const { browser, page } = await initPage();
	await page.setUserAgent(
		'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
	);
	let capturedHeaders;
	page.on('request', (request) => {
		capturedHeaders = request.headers();
	});

	await page.setBypassCSP(true);
	const maxRetries = 5;
	let currentAttempt = 1;
	async function getSP500() {
		logAction(`fetching url: ${urls[0]}`);
		await page.goto(urls[0]);

		const interceptUrl =
			'https://www.barchart.com/proxies/core-api/v1/quotes/get?list=stocks.markets.sp500';

		logAction(`fetching url: ${urls[1]}`);
		await page.goto(urls[1]);
		const sp500Data = await intercept(page, interceptUrl);

		console.log({ sp500Data });
		let csv = '';

		if (sp500Data) {
			let collector = [];
			sp500Data.data.forEach((stock) => {
				console.log(stock.symbol);
				const obj = {
					symbol: stock.symbol,
					name: stock.symbolName,
					lastPrice: stock.lastPrice,
					priceChange: stock.priceChange,
					percentChange: stock.percentChange,
					highPrice: stock.highPrice,
					lowPrice: stock.lowPrice,
					volume: stock.volume,
					tradeTime: stock.tradeTime,
					symbolCode: stock.symbolCode,
					hasOptions: stock.hasOptions,
					symbolType: stock.symbolType,
				};
				console.log(obj);
				collector.push(obj);
			});
			csv = json2csv(collector);
			if (!sp500Data && currentAttempt < maxRetries) {
				currentAttempt++;
				logAction('retrying...');
				await getSP500();
			} else {
				fs.writeFileSync('test.csv', csv);
				fs.writeFileSync('test.json', JSON.stringify(sp500Data.data, null, 2));
			}
		}
	}
	await getSP500();
	return await browser.close();
};

init();
