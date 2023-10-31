/**
 * Scrolls the specified element on the page to the given scroll position.
 *
 * @param {import('puppeteer').Page} page - The Puppeteer page object.
 * @param {string} selector - The selector for the element to scroll.
 * @param {Object} options - The scroll position options.
 * @param {number} options.scrollLeft - The horizontal scroll position.
 * @param {number} options.scrollTop - The vertical scroll position.
 */
const scrollElement = async (page, selector, { scrollLeft, scrollTop }) => {
	await page.locator(selector).scroll({
		scrollLeft,
		scrollTop,
	});
};
export default scrollElement;
