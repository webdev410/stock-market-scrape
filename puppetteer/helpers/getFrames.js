// Get frames
/**
 * Returns an array of all frames attached to the given page.
 * @param {Page} page - The Puppeteer page object.
 * @returns {Promise<Array<Frame>>} - A promise that resolves to an array of Frame objects.
 */
const getFrames = async (page) => {
	return page.frames();
};
export default getFrames;
