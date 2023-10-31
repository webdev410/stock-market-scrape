const getCsvFromTable = async (page, tableId = 'table-reflow') => {
	return await page.evaluate((tableId) => {
		const table = document.getElementById(tableId);
		if (!table) {
			console.error('Table with ID "table-reflow" not found.');
			return;
		}

		let csv = '';

		// Get headers
		const headers = Array.from(table.querySelectorAll('thead th'))
			.map((header) => `"${header.textContent.trim()}"`)
			.join(',');

		csv += headers + '\n';

		// Get rows
		const rows = table.querySelectorAll('tbody tr');

		for (const row of rows) {
			const rowData = Array.from(row.querySelectorAll('td'))
				.map((cell) => `"${cell.textContent.trim()}"`)
				.join(',');

			csv += rowData + '\n';
		}

		return csv;
	}, tableId);
};
export default getCsvFromTable;
