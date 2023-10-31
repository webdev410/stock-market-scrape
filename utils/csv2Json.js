function csv2Json(csvData, selectedColumns = []) {
	const lines = csvData.split('\n');
	if (lines.length === 0) {
		return 'No data to convert';
	}

	// Extract headers
	const headers = lines[0].split(',');
	const columnIndexMap = headers.reduce((acc, header, index) => {
		acc[header.trim()] = index;
		return acc;
	}, {});

	// Validate selected columns
	if (selectedColumns.length === 0) {
		selectedColumns = headers.map((header) => header.trim());
	} else {
		for (const column of selectedColumns) {
			if (!columnIndexMap.hasOwnProperty(column)) {
				return `Invalid column: ${column}`;
			}
		}
	}

	// Create JSON
	const jsonOutput = [];
	for (let i = 1; i < lines.length; i++) {
		const line = lines[i];
		const values = line.split(',');
		const obj = {};
		for (const column of selectedColumns) {
			const index = columnIndexMap[column];
			obj[column] = values[index].trim();
		}
		jsonOutput.push(obj);
	}

	return jsonOutput;
}

// // Example usage:
// const csvData = `name,age,job
// Alice,25,Engineer
// Bob,30,Designer
// Charlie,35,Doctor`;
//
// const selectedColumns = ['name', 'age'];
// const jsonOutput = csvToJson(csvData, selectedColumns);
// console.log(JSON.stringify(jsonOutput, null, 2));
export default csv2Json;
