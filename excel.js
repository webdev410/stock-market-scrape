Excel.run(async (context) => {
	// Get the active worksheet
	let sheet = context.workbook.worksheets.getActiveWorksheet();

	// Make an HTTP request to get the CSV data
	const response = await fetch('https://bk.keiserdev.com/sp500');
	const csvText = await response.text();

	// Assuming the CSV data is separated by commas and new lines
	const csvRows = csvText
		.trim()
		.split('\n')
		.map((row) => row.split(','));

	// Find the range to place the data based on the size of the CSV
	const rowCount = csvRows.length;
	const columnCount = csvRows[0].length;
	const dataRange = sheet.getRangeByIndexes(0, 0, rowCount, columnCount);

	// Set the CSV data in the worksheet
	dataRange.values = csvRows;

	// Format the header to stand out
	const headerRange = sheet.getRangeByIndexes(0, 0, 1, columnCount);
	headerRange.format.fill.color = '#4472C4';
	headerRange.format.font.color = 'white';
	headerRange.format.font.bold = true;

	await context.sync();
}).catch((error) => {
	console.error(error);
});
