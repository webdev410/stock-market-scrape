import puppeteer from 'puppeteer';
import config from '../config.js';

/**
 * Initializes a new Puppeteer browser instance and creates a new page with the specified viewport settings.
 * @returns {Promise<{browser: import('puppeteer').Browser, page: import('puppeteer').Page}>} An object containing the Puppeteer browser instance and the newly created page.
 */
const initPage = async () => {
	const browser = await puppeteer.launch(config.puppeteerOptions);
	const page = await browser.newPage();
	await page.setViewport(config.settings.viewport);

	page.on('console', (msg) => console.log(msg.text()));

	await page.setRequestInterception(true);
	page.on('request', (interceptedRequest) => {
		if (interceptedRequest.isInterceptResolutionHandled()) return;
		if (
			interceptedRequest.url().endsWith('.png') ||
			interceptedRequest.url().endsWith('.jpg')
		) {
			interceptedRequest.abort();
		} else interceptedRequest.continue();
	});

	return { browser, page };
};
export default initPage;
