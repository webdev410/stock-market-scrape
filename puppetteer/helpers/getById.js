import puppeteer from 'puppeteer';
/**
 * Returns a Puppeteer element with the specified ID.
 *
 * @param {Page} page - The Puppeteer page object to search for the element.
 * @param {string} id - The ID of the element to search for.
 * @returns {Promise<ElementHandle>} A Promise that resolves with the Puppeteer ElementHandle for the specified ID.
 */
const getById = async (page, id) => {
	puppeteer.registerCustomQueryHandler('getById', {
		queryOne: (elementOrDocument, selector) => {
			return elementOrDocument.querySelector(`[id="${CSS.escape(selector)}"]`);
		},
		queryAll: (elementOrDocument, selector) => {
			return elementOrDocument.querySelectorAll(
				`[id="${CSS.escape(selector)}"]`
			);
		},
	});

	return await page.waitForSelector(`::-p-getById(${id})`);
};
export default getById;
