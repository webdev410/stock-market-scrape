import fs from 'fs';
const interceptAndSave = (page, searchString, name) => {
	return new Promise(async (resolve, reject) => {
		const listener = async (response) => {
			const url = response.url();
			if (url.includes(searchString)) {
				try {
					const payload = await response.json();
					fs.writeFileSync(`./output/${name}.json`, JSON.stringify(payload));
					console.log('saved', name);
					// Remove this response listener to prevent memory leaks.
					page.off('response', listener);

					resolve(payload);
				} catch (error) {
					// Remove this response listener to prevent memory leaks.
					page.off('response', listener);

					reject(error);
				}
			}
		};

		page.on('response', listener);
	});
};

export default interceptAndSave;
