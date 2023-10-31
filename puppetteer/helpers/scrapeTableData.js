/**
 * Scrapes data from a table on a given page.
 * @param {Page} page - The Puppeteer page to scrape data from.
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of objects, where each object represents a row of data from the table.
 */
async function scrapeTableData(page) {
	const extractedData = await page.evaluate(() => {
		// Find the table headers by looking for text
		const headerElements = Array.from(document.querySelectorAll('th'));
		const headers = headerElements.map((header) => header.innerText.trim());

		// Create an empty array to store our row data
		const data = [];

		// Find the rows based on some suitable selector
		const rowElements = Array.from(document.querySelectorAll('tr'));
		for (let rowElement of rowElements) {
			// Skip rows that are headers
			if (rowElement.querySelector('th')) continue;

			const rowData = {};
			const cellElements = Array.from(rowElement.querySelectorAll('td'));

			// Populate rowData object
			for (let i = 0; i < cellElements.length; i++) {
				const cellValue = cellElements[i].innerText.trim();
				const header = headers[i];
				rowData[header] = cellValue;
			}

			// Push the rowData object to data array
			data.push(rowData);
		}
		return data;
	});

	return extractedData;
}
export default scrapeTableData;
