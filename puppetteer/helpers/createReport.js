import Report from '../../models/Report.js';

/**
 * Creates a new report object and saves it to the database.
 * @async
 * @function createReport
 * @param {string} [vendor=''] - The name of the vendor associated with the report.
 * @returns {Promise<Report>} - A promise that resolves with the newly created report object.
 */
async function createReport(vendor) {
	const report = new Report({
		csv: 'test',
		tableData: [],
		dateStarted: new Date(),
		dateUpdated: null,
		dateCompleted: null,
		status: 'pending',
		vendor: vendor || '',
	});
	await report.save();
	return report;
}
export default createReport;
