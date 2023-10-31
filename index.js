import fs from 'fs';
import initPage from './puppetteer/helpers/initPage.js';
import interceptAndSave from './puppetteer/helpers/interceptAndSave.js';
import wait from './puppetteer/helpers/wait.js';
import json2csv from './utils/json2csv.js';
import { logAction, logInfo, logPink } from './puppetteer/helpers/logAction.js';
import TableData from './models/TableData.js';
import sendEmail from './email/sendEmail.js';

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

	const emails = ['andrewkeiser@gmail.com' /* 'bakeiser17@gmail.com'*/];
	for (const email of emails) {
		const sp500 = fs.readFileSync(`./output/sp500.csv`, 'utf8');
		const nasdaq = fs.readFileSync(`./output/nasdaq.csv`, 'utf8');
		const dow = fs.readFileSync(`./output/dow.csv`, 'utf8');
		const russell2000 = fs.readFileSync(`./output/russell2000.csv`, 'utf8');
		const date = new Date();
		const attachments = [
			{
				filename: `${date}-sp500.csv`,
				content: sp500 || 'export failed',
			},
			{
				filename: `${date}-nasdaq.csv`,
				content: nasdaq || 'export failed',
			},
			{
				filename: `${date}-dow.csv`,
				content: dow || 'export failed',
			},
			{
				filename: `${date}-russell2000.csv`,
				content: russell2000 || 'export failed',
			},
		];

		await sendEmail({
			to: email,
			subject: 'Stock Reports',
			text: 'Here are the stock reports you requested',
		});
	}
	await browser.close();
	return;
};

init();
