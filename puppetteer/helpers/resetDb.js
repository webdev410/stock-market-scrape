import Report from '../../models/Report.js';
import Result from '../../models/Result.js';
import TableData from '../../models/TableData.js';

/**
 * Resets the database by deleting all records from the TableData and Report collections.
 * @async
 * @function resetDB
 * @returns {Promise<void>}
 */
async function resetDB() {
	console.log('resetting db');
	await TableData.deleteMany({});
	await Report.deleteMany({});
	await Result.deleteMany({});
	return;
}
export default resetDB;
