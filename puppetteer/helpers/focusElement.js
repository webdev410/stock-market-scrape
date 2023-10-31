/**
 * Focuses on the element with the given selector on the provided page.
 * @param {Page} page - The Puppeteer page to focus the element on.
 * @param {string} selector - The selector for the element to focus on.
 */
const focusElement = async (page, selector) => {
	await page.focus(selector);
};

export default focusElement;
