import { logInfo } from '../puppetteer/helpers/logAction.js';

function json2Csv(jsonArray) {
	logInfo('Convert JSON to CSV');
	try {
		// Validate input
		if (!Array.isArray(jsonArray) || jsonArray.length === 0) {
			return null;
		}

		// Extract header (keys)
		const keys = Object.keys(jsonArray[0]);

		// Initialize CSV array with header
		const csvArray = [keys.join(',')];

		// Iterate through JSON array to populate CSV array
		for (const obj of jsonArray) {
			const row = [];
			for (const key of keys) {
				// Quote the values to handle values with commas and line breaks
				row.push(`"${obj[key]}"`);
			}
			csvArray.push(row.join(','));
		}
		console.log(csvArray);
		// Join array into a string with newlines
		return csvArray.join('\n');
	} catch (error) {
		console.error(error);
		return 'csv failed';
	}
}
export default json2Csv;
