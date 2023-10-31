import getPopulateFields from './getPopulateFields.js';

/**
 * Universal function to find and populate a document
 *
 * Usage Examples:
 * ```js
 * findAndPopulate(Scan, scanId, { limit: 5, sort: { createdAt: -1 } }).then(doc => {
 *     console.log('Populated Document:', doc);
 * });
 *
 * findAndPopulate(Scan, null, { limit: 5, sort: { createdAt: -1 } }).then(docs => {
 *     console.log('Populated Documents:', docs);
 * });
 * ```
 *
 * @param {*} model - Mongoose model
 * @param {*} id - Optional document ID
 * @param {Object} options - Additional query options like limit, sort, skip, etc.
 * @returns {Promise<*>} - Promise resolving to either a single populated document if ID is provided, or an array of all populated documents if no ID is provided
 */
const findAndPopulate = async (model, id, options = {}) => {
	try {
		const populateFields = getPopulateFields(model.schema);
		let query;

		if (id) {
			query = model.findById(id);
		} else {
			query = model.find();
		}

		// Apply additional query options
		if (options.limit) {
			query = query.limit(options.limit);
		}

		if (options.sort) {
			query = query.sort(options.sort);
		}

		if (options.skip) {
			query = query.skip(options.skip);
		}

		populateFields.forEach((field) => {
			query = query.populate(field);
		});

		const document = await query.exec();

		return document;
	} catch (error) {
		console.error('An error occurred:', error);
		return null;
	}
};

export default findAndPopulate;
