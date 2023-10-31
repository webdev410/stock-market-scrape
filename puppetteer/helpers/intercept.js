const intercept = async (page, urlPattern) => {
	console.log({ urlPattern });
	return new Promise(async (resolve, reject) => {
		// Register an event to listen for responses
		page.on('response', async (response) => {
			if (response.url().includes(urlPattern)) {
				try {
					const jsonPayload = await response.json();
					const url = response.url();
					resolve({ url, ...jsonPayload });
				} catch (error) {
					reject(error);
				}
			}
		});
	});
};

export default intercept;
