/**
 * Exposes a function to the page's JavaScript context.
 *
 * @param {Page} page - The Puppeteer page object.
 * @param {string} name - The name of the function to expose.
 * @param {Function} fn - The function to expose.
 * @returns {Promise<void>} - A Promise that resolves when the function has been exposed.
 */
const exposeFunction = async (page, name, fn) => {
	await page.exposeFunction(name, fn);
};
export default exposeFunction;
