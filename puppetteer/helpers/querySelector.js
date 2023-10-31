/**
 * Finds the first element in the page that matches the given selector.
 *
 * @param {Page} page - The Puppeteer page object to search within.
 * @param {string} selector - The CSS selector to search for.
 * @returns {Promise<ElementHandle|null>} - A Promise that resolves with the first matching element, or null if no element is found.
 */

const querySelector = async (page, selector) => {
	return await page.$(selector);
};
export default querySelector;
