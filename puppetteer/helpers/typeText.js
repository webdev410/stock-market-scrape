// Keyboard functions
/**
 * Types the given text into the page using the keyboard.
 * @param {Page} page - The Puppeteer page to type the text into.
 * @param {string} text - The text to type into the page.
 */
const typeText = async (page, text) => {
	await page.keyboard.type(text);
};
export default typeText;
