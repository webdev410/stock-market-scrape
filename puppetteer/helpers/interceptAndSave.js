import TableData from '../../models/TableData.js';

const interceptAndSave = (page, searchString) => {
	page.on('response', async (response) => {
		const url = response.url();

		if (url.includes(searchString)) {
			const payload = await response.json();
			console.log({ payload });

			return payload;
		}
	});
};

export default interceptAndSave;
