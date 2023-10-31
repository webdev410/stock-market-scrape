const getPopulateFields = (schema) => {
	const fields = Object.keys(schema.paths);
	return fields.filter((field) => {
		const pathType = schema.paths[field];

		// Check if it's a direct reference to another model
		if (pathType.options && pathType.options.ref) {
			return true;
		}

		// Check if it's an array containing references to another model
		if (
			Array.isArray(pathType.options.type) &&
			pathType.options.type.length > 0
		) {
			return pathType.options.type[0].hasOwnProperty('ref');
		}

		return false;
	});
};

export default getPopulateFields;
