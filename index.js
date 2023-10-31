import fs from 'fs';
import initPage from './puppetteer/helpers/initPage.js';
import interceptAndSave from './puppetteer/helpers/interceptAndSave.js';
import json2csv from './utils/json2csv.js';
import { logAction, logInfo, logPink } from './puppetteer/helpers/logAction.js';
import TableData from './models/TableData.js';
function readFileAndConvertCSV(filepath = './output/sp500.json') {
	let csv = '';
	const filecontents = fs.readFileSync(filepath, 'utf8');
	const data = JSON.parse(filecontents);
	if (data) {
		logInfo('data');
		csv = json2csv(data.data);
	}

	if (csv) {
		logInfo('there is data');
		fs.writeFileSync('./output/sp500.csv', csv);
	}
}
const init = async () => {
	logPink('hi brandon');
	const filepath = './output/sp500.json';
	const urls = [
		'https://www.barchart.com/stocks/indices/sp/sp500?orderBy=symbol&orderDir=asc&page=all',
	];
	const { browser, page } = await initPage();
	const interceptUrl =
		'https://www.barchart.com/proxies/core-api/v1/quotes/get?list=stocks.markets.sp500';

	const sp500Data = interceptAndSave(page, interceptUrl, filepath);
	logAction(`fetching url: ${urls[0]}`);
	await page.goto(urls[0]);

	readFileAndConvertCSV(filepath);
	// await getSP500();
	await browser.close();
	return;
};

init();
