// Get all HTML content
/**
 * Returns the HTML content of a given Puppeteer page.
 *
 * @async
 * @param {Page} page - The Puppeteer page object.
 * @returns {Promise<string>} - The HTML content of the page.
 */
const getHtmlContent = async (page) => {
	return await page.content();
};
export default getHtmlContent;
