// Get metrics
/**
 * Returns the metrics for a given Puppeteer page.
 * @param {Page} page - The Puppeteer page to get metrics for.
 * @returns {Promise<Metrics>} - The metrics for the given page.
 */
const getMetrics = async (page) => {
	return await page.metrics();
};
export default getMetrics;
