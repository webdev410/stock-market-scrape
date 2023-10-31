// Reload page
/**
 * Reloads the given Puppeteer page with the specified options.
 * @param {Page} page - The Puppeteer page to reload.
 * @param {Object} options - The options to use when reloading the page.
 * @returns {Promise<void>} - A Promise that resolves when the page has finished reloading.
 */
const reloadPage = async (page, options) => {
	return await page.reload(options);
};
export default reloadPage;
