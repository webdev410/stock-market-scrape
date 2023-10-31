/**
 * Fills an input field with the specified value.
 * @param {import('puppeteer').Page} page - The Puppeteer page object.
 * @param {string} selector - The selector for the input field.
 * @param {string} value - The value to fill the input field with.
 */
const fillInput = async (page, selector, value) => {
	await page.locator(selector).fill(value);
};
export default fillInput;
