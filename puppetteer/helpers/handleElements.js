/**
 * Takes a page, selector, and function and executes the function on each element matching the selector
 * @param {*} page
 * @param {*} selector
 * @param {*} actionFunction
 */
const handleElements = async (page, selector, actionFunction) => {
	try {
		// Wait for the selector to appear on the page
		await page.waitForSelector(selector, { timeout: 5000 });

		// Execute the action function on each element matching the selector
		await page.evaluate(
			(selector, actionFunction) => {
				const elements = document.querySelectorAll(selector);
				console.log(
					`Found ${elements.length} elements with selector: ${selector}`
				);
				for (const element of elements) {
					// Use 'new Function' to turn the function string back into a function
					const fn = new Function('return ' + actionFunction)();
					fn(element);
				}
			},
			selector,
			actionFunction.toString()
		);

		console.log(
			`Successfully executed action on elements with selector: ${selector}`
		);
	} catch (error) {
		console.error(
			`Failed to handle elements with selector: ${selector}. Error: ${error}`
		);
	}
	return true;
};
export default handleElements;
