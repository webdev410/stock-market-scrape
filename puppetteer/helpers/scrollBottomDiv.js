import wait from './wait.js';

/**
 * Scrolls to the bottom of a scrollable div element identified by the given selector.
 * @param {Page} page - The Puppeteer page object.
 * @param {string} selector - The selector for the scrollable div element.
 * @returns {Promise<void>} - A Promise that resolves when the scrolling is complete.
 */
async function scrollBottomDiv(page, selector) {
	console.log('begin scrollBottomDiv', selector);

	await page.evaluate(async (selector) => {
		const scrollableDiv = document.querySelector(selector);
		if (scrollableDiv) {
			let lastScrollTop = 0;
			let currentScrollTop = 0;

			do {
				lastScrollTop = scrollableDiv.scrollTop;
				scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
				await wait(500);
				currentScrollTop = scrollableDiv.scrollTop;
				console.log({ lastScrollTop, currentScrollTop });
			} while (currentScrollTop > lastScrollTop);
		}
	}, selector);
}

// Usage
// await scrollBottomDiv(
// 	page,
// 	'#reactJobPicker > div > div.ant-list.ant-list-split.BTListVirtual.JobList > div > div > div:nth-child(1) > div > div'
// );
export default scrollBottomDiv;
