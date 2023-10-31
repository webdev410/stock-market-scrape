const config = {
	db: { reset: false, resetAll: true },
	downloadDir: './downloads',
	settings: { viewport: { width: 1080, height: 720 } },
	puppeteerOptions: {
		// slowMo: 30,
		// devtools: true,
		// headless: 'new',
		headless: false,
		args: [
			'--disable-web-security',
			// '--no-sandbox',
			// '--disable-setuid-sandbox',
		],
	},
};
export default config;
