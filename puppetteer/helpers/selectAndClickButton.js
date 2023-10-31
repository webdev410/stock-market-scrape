/**
 * Clicks the button with the specified selector on the given page.
 * @param {Page} page - The Puppeteer page object.
 * @param {string} selector - The selector for the button to click.
 * @returns {Promise<boolean>} - A Promise that resolves to true if the button was clicked successfully, or false otherwise.
 */
const selectAndClickButton = async (page, selector) => {
	try {
		// Wait for the selector to appear on the page
		await page.waitForSelector(selector, { timeout: 5000 });
		// Click the button with the specified selector
		await page.click(selector);
		// Optionally, wait for navigation or some action to complete after clicking
		await page.waitForNavigation({ waitUntil: 'networkidle0' });
		console.log(`Successfully clicked the button with selector: ${selector}`);
	} catch (error) {
		console.error(
			`Failed to click the button with selector: ${selector}. Error: ${error}`
		);
	}
	return true;
};

export default selectAndClickButton;
