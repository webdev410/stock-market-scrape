async function safeClick(page, element) {
	for (let i = 0; i < 3; i++) { // try up to 3 times
		try {
			await page.evaluate((elem) => elem.blur());
			await element.focus();
			await element.click();
			return;
		} catch (e) {
			console.warn(`Click failed, retrying ${i + 1}...`);
			await page.waitForTimeout(500); // wait for 0.5 second before retrying
		}
	}
	throw new Error('Failed to click element after multiple attempts');
}
export default safeClick;