async function main(workbook: ExcelScript.Workbook) {
	// Call the GitHub REST API.
	// Replace the {USERNAME} placeholder with your GitHub username.
	const response = await fetch('https://bk.keiserdev.com/api/get-data');
	const repos: Repository[] = await response.json();

	// Create an array to hold the returned values.
	const rows: (string | boolean | number)[][] = [];

	// Convert each repository block into a row.
	for (let repo of repos) {
		rows.push([repo.id, repo.name, repo.license?.name, repo.license?.url]);
	}
	// Create a header row.
	const sheet = workbook.getActiveWorksheet();
	sheet
		.getRange('A1:D1')
		.setValues([['ID', 'Name', 'License Name', 'License URL']]);

	// Add the data to the current worksheet, starting at "A2".
	const range = sheet
		.getRange('A2')
		.getResizedRange(rows.length - 1, rows[0].length - 1);
	range.setValues(rows);
}

// An interface matching the returned JSON for a GitHub repository.
interface Repository {
	name: string;
	id: string;
	license?: License;
}

// An interface matching the returned JSON for a GitHub repo license.
interface License {
	name: string;
	url: string;
}
