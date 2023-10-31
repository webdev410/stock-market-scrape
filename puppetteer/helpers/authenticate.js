/**
 * Authenticates the given page using the provided credentials.
 * @param {import('puppeteer').Page} page - The page to authenticate.
 * @param {Object} credentials - The credentials to use for authentication.
 * @returns {Promise<void>}
 */
const authenticate = async (page, credentials) => {
	await page.authenticate(credentials);
};
export default authenticate;
