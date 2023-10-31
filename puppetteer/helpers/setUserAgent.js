/**
 * ```js
 *   await setUserAgent(page, userAgent, userAgentMetadata);
```
 * @param {*} page 
 * @param {*} userAgent 
 * @param {*} userAgentMetadata 
 */
/**
 * Sets the user agent for a Puppeteer page.
 *
 * @param {Page} page - The Puppeteer page to set the user agent for.
 * @param {string} userAgent - The user agent string to set.
 * @param {Object} [userAgentMetadata] - Optional metadata to associate with the user agent.
 * @returns {Promise<void>} - A Promise that resolves when the user agent has been set.
 */
const setUserAgent = async (page, userAgent, userAgentMetadata) => {
	await page.setUserAgent(userAgent, userAgentMetadata);
};
export default setUserAgent;
