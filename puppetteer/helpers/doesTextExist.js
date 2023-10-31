/**

 */
/**
 * Checks if the given text exists on the page.
 *  * ```js
 * // usage
 * const textExists = await doesTextExist(page, 'TOTAL OF ALL 0 RECORDS');
 * ```
 * @param {Page} page - The Puppeteer page object.
 * @param {string} searchText - The text to search for on the page.
 * @returns {Promise<boolean>} - A Promise that resolves to a boolean indicating whether the text exists on the page.
 */
const doesTextExist = async (page, searchText) => {
	const textContent = await page.evaluate(() => {
		return document.documentElement.innerText;
	});

	return textContent.includes(searchText);
};
export default doesTextExist;
