/**
 * Attaches a listener to the provided Puppeteer page object that logs all console messages except those in the filter list.
 *
 * @param {Page} page - The Puppeteer page object to attach the listener to.
 */
const handleConsoleLogs = (page) => {
	page.on('console', (msg) => {
		const filterList = ['DevTools debugger', 'Download the React DevTools'];
		if (!filterList.includes(msg.text())) {
			console.log('[PAGE LOG]', msg.text());
		}
	});
	return;
};
export default handleConsoleLogs;
