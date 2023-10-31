import selectAndClickButton from './selectAndClickButton.js';

/**
 * Clicks the 3House button on the given Puppeteer page.
 * @param {Page} page - The Puppeteer page to click the button on.
 * @returns {Promise<void>}
 */
async function click3HouseBtn(page) {
	await selectAndClickButton(
		page,
		'#nav_site > div > ul > li.widenav.lidevselection > a'
	);
	return;
}
export default click3HouseBtn;
