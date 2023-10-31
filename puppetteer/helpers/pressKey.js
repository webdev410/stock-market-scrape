/**
 * Presses a key on the keyboard.
 * @param {Page} page - The Puppeteer page object.
 * @param {string} key - The key to press.
 * @returns {Promise<void>}
 */
const pressKey = async (page, key) => {
	await page.keyboard.press(key);
};
export default pressKey;
