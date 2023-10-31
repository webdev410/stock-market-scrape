import puppeteer from 'puppeteer';

async function checkForErrors(page) {
	const errorFound = await page.evaluate(() => {
		const walker = document.createTreeWalker(
			document.body,
			NodeFilter.SHOW_TEXT,
			null,
			false
		);

		let node;
		while ((node = walker.nextNode())) {
			if (node.nodeValue.toLowerCase().includes('error')) {
				return true;
			}
		}
		return false;
	});

	if (errorFound) {
		console.log('🚨 Errors found on page');

		await page.type('#user_name', 'andrewlatone');
		await page.type('#password', 'Siding123!');

		const forceSignonCheckbox = await page.$('[name="force_signon"]');
		if (forceSignonCheckbox) {
			await forceSignonCheckbox.click(); // This assumes the checkbox is not already checked
		}

		await page.click('[name="cmdSubmit"]');
	}
}

export default async function universal(url) {
	(async () => {
		let scrapedData = [];
		let instructions = [];

		let urls = [
			{
				url: 'https://www.hyphensolutions.com/MH2Supply/Login.asp',
				username: 'andrewlatone',
				password: 'Siding123!',
			},
		];

		for (const website of urls) {
			console.log(`👨‍💻 Visiting ${website.url}`);
			const browser = await puppeteer.launch({
				headless: false,
				// devtools: true,
				slowMo: 20, // slow down by 250ms
			});

			const page = await browser.newPage();
			await page.goto(website.url);
			let instructions = [];

			if (website.url.includes('hyphensolutions.com')) {
				// TODO: future orders & received orders
				instructions = [
					{ type: 'input', selector: '#user_name', value: website.username },
					{ type: 'input', selector: '#password', value: website.password },
					{ type: 'click', selector: 'input[name="cmdSubmit"]' },
					{ type: 'custom', value: checkForErrors },
					{ type: 'click-innerText', selector: 'b', value: 'Orders' },
					{ type: 'click-innerText', selector: 'b', value: 'Received' },
					{
						type: 'multiSelectAndScrape',
						firstSelectSelector: 'select[name="account_id"]',
						secondSelectSelector: 'select[name="subdivision_name"]',
						waitTime: 1000,
					},
					{ type: 'table2' },
				];
			}

			for (const instruction of instructions) {
				switch (instruction.type) {
					case 'input':
						await page.type(instruction.selector, instruction.value);
						break;
					case 'click':
						await page.click(instruction.selector);
						break;
					case 'hover':
						await page.hover(instruction.selector);
						break;
					case 'scrollIntoView':
						await page.evaluate((selector) => {
							document.querySelector(selector).scrollIntoView();
						}, instruction.selector);
						break;
					case 'wait':
						if (instruction.selector) {
							await page.waitForSelector(instruction.selector, {
								timeout: instruction.duration,
							});
						}
						break;
					case 'uploadFile':
						const input = await page.$(instruction.selector);
						await input.uploadFile(instruction.filePath);
						break;
					case 'check':
						await page.evaluate((selector) => {
							document.querySelector(selector).checked = true;
						}, instruction.selector);
						break;
					case 'uncheck':
						await page.evaluate((selector) => {
							document.querySelector(selector).checked = false;
						}, instruction.selector);
						break;
					case 'executeJs':
						await page.evaluate(instruction.code);
						break;
					case 'screenshot':
						await page.screenshot({ path: instruction.filename });
						break;
					case 'writeToFile':
						const textContent = await page.$eval(
							instruction.selector,
							(el) => el.textContent
						);
						fs.writeFileSync(instruction.filename, textContent);
						break;
					case 'readFromFile':
						const fileContent = fs.readFileSync(instruction.filename, 'utf-8');
						// Perform any additional operations with the read text
						break;

					case 'custom':
						await instruction.value(page); // Assuming checkForErrors is an async function
						break;
					case 'click-innerText':
						await page.evaluate(
							(selector, value) => {
								const element = [...document.querySelectorAll(selector)].find(
									(el) => el.textContent === value
								);
								element && element.click();
							},
							instruction.selector,
							instruction.value
						);
						break;

					case 'multiSelectAndScrape':
						// Get all options from the first dropdown
						const firstSelectOptions = await page.evaluate((selector) => {
							const options = Array.from(
								document.querySelector(selector).options
							);
							return options.map((option) => option.value);
						}, instruction.firstSelectSelector);

						for (const firstValue of firstSelectOptions) {
							// Skip 'NULL' or similar unwanted values
							if (firstValue !== 'NULL') {
								await page.select(instruction.firstSelectSelector, firstValue);

								// Wait for the second dropdown to populate
								await new Promise((r) =>
									setTimeout(r, instruction.waitTime || 1000)
								);

								// Get all options from the second dropdown
								const secondSelectOptions = await page.evaluate((selector) => {
									const options = Array.from(
										document.querySelector(selector).options
									);
									return options.map((option) => option.value);
								}, instruction.secondSelectSelector);

								for (const secondValue of secondSelectOptions) {
									await page.select(
										instruction.secondSelectSelector,
										secondValue
									);

									// Wait for the second dropdown to populate
									await new Promise((r) =>
										setTimeout(r, instruction.waitTime || 1000)
									);

									// Scrape the table
									const scrapedData = await scrapeTable(page); // Make sure to define scrapeTable

									// Write scraped data to file
									const fs = require('fs');
									fs.writeFileSync(
										`./output/${Date.now()}.json`,
										JSON.stringify(scrapedData, null, 2)
									);
								}
							}
						}
						break;

						async function scrapeTable(page) {
							// Your table scraping logic here
						}

					default:
						console.warn(`Unknown instruction type: ${instruction.type}`);
						break;
				}
			}

			await browser.close();
		}
	})();
}
