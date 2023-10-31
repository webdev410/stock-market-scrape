import { logAction, logInfo } from './logAction.js';

/**
 * Wait for a specified amount of time.
 * @param {number} ms - The number of milliseconds to wait.
 * @returns {Promise<void>} - A promise that resolves after the specified time has elapsed.
 */
const wait = async (ms) => {
	logAction(`Waiting ${ms}ms`);
	return new Promise((resolve) => setTimeout(resolve, ms));
};
export default wait;
