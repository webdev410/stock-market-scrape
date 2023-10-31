// Query selector all
/**
 * Returns an array of all elements matching the given selector.
 *
 * @param {Page} page - The Puppeteer page object.
 * @param {string} selector - The selector to search for.
 * @returns {Promise<Array<ElementHandle>>} - A promise that resolves to an array of ElementHandle objects.
 */
const querySelectorAll = async (page, selector) => {
	return await page.$$(selector);
};
export default querySelectorAll;
