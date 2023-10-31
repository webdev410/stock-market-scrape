/**
 * Extracts data from a string using a regular expression and returns an object with the extracted values.
 * @param {Object} options - The options object.
 * @param {string} options.keyName - The key name for the extracted data.
 * @param {string} options.selector - The regular expression string used to match the target data.
 * @param {string} inputString - The input string to search for matches.
 * @returns {Object} - An object with the keyName and the extracted values.
 */
function cleanData({ keyName, selector }, inputString) {
	// Create a new RegExp object based on the selector string
	const regex = new RegExp(selector, 'g');

	// Execute the regular expression to find all matches
	const matches = inputString.matchAll(regex);

	// Initialize an empty result array
	const results = [];

	// Iterate through matches
	for (const match of matches) {
		results.push(match[1]); // Assuming the target data is in capturing group 1
	}

	console.log({ results });
	// Return an object with the keyName and the extracted values
	return { [keyName]: results };
}

// Define some example selectors for your specific markup

// Example usage
// const parsedData = cleanData(
// 	{ keyName: 'email', selector: '(\\w+@\\w+\\.\\w+)' },
// 	'My email is example@example.com'
// );

export default cleanData;
