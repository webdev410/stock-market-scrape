// Evaluate function
/**
 * Evaluates a function in the context of the current page.
 *
 * @param {Page} page - The Puppeteer page to evaluate the function on.
 * @param {Function} fn - The function to evaluate.
 * @param {...*} args - Arguments to pass to the function.
 * @returns {Promise<*>} - A promise that resolves with the result of the function evaluation.
 */
const evaluateFunction = async (page, fn, ...args) => {
	return await page.evaluate(fn, ...args);
};
export default evaluateFunction;
