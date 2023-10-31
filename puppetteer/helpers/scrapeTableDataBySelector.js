import { logAction, logInfo, logPink } from './logAction.js';

const scrapeTableDataBySelector = async (page, selectors, existingData) => {
	logInfo('inside scrapeTableDataBySelector');
	return await page.evaluate(
		(selectors, existingData) => {
			console.log('inside page.evaluate');
			const rows = document.querySelectorAll('tr'); // Select all rows in the table.
			const data = []; // To hold all the scraped data.

			// Loop through each row.
			console.log('looping through each row');
			for (const row of rows) {
				// Existing data is for the PO object that all the rows will be added to
				const rowData = { ...existingData }; // To hold the data for a single row.

				console.log('loop through each selector for the row');
				// Loop through each selector to scrape the data for that row.
				selectors.forEach(({ keyName, selector }) => {
					const cell = row.querySelector(selector);
					rowData[keyName] = cell ? cell.innerText.trim() : null; // Save the cell text in rowData.
				});
				// Helper function to check if all values in an object are null
				console.log('check if all values in an object are null');
				const allValuesAreNull = (obj) => {
					return Object.values(obj).every((value) => value === null);
				};

				// Check if all values in rowData are null. If not, add to data array.
				console.log('if not all values in rowData are null, add to data array');
				if (!allValuesAreNull(rowData)) {
					data.push(rowData); // Add the scraped data for this row to the main data array.
				}
			}

			console.log(`returning data: ${data.length} rows`);
			return data; // Return the main data array.
		},
		selectors,
		existingData
	);
};

export default scrapeTableDataBySelector;
