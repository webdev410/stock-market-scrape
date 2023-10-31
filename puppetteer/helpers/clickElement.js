// Click on an element
/**
 * Clicks on an element with the given selector on the provided page.
 * @param {Page} page - The Puppeteer page to interact with.
 * @param {string} selector - The selector for the element to click.
 * @returns {Promise<void>}
 */
const clickElement = async (
	page,
	selector,
	{ waitOptions = 'networkIdle0', clickOptions = { delay: 100 } }
) => {
	// const element = await page.waitForSelector(selector);
	// await element.click();
	// await element.dispose();
	//
	await Promise.all([
		page.waitForNavigation(waitOptions),
		page.click(selector, clickOptions),
	]);
};

export default clickElement;
