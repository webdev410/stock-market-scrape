import dotenv from 'dotenv';
import db from '../db/db.js';
import colors from '../utils/colors.js';
import createReport from './helpers/createReport.js';
import sendEmail from '../controllers/email/sendEmail.js';
dotenv.config();

async function fakeScrape() {
	await db();
	console.log(
		`${colors.yellow}Scraping Supply Pro Future Orders${colors.reset}`
	);
	const allScrapedData = [];
	const report = await createReport();
	await sendEmail({
		to: 'andrewkeiser@gmail.com',
		subject: 'A Supply Pro scan has completed!',
		text: `A new Supply Pro scan has completed courtesy of keiserdev.com`,
		downloadId: report._id,
		attachments: [],
		replaceInfo: {
			homeBuilder: 'Supply Pro',
		},
	});
	return;
}
export default fakeScrape;
