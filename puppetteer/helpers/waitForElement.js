/**
 * Waits for the specified element to appear on the page.
 * @param {import('puppeteer').Page} page - The Puppeteer page object.
 * @param {string} selector - The CSS selector for the element to wait for.
 */
const waitForElement = async (page, selector) => {
	await page.locator(selector).wait();
};
export default waitForElement;
