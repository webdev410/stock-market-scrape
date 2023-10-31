import sendEmail from '../controllers/email/sendEmail.js';

async function handleEmails(
	report,
	csv,
	vendor = '',
	emails = ['andrewkeiser@gmail.com']
) {
	const attachments = [
		{
			filename: `${new Date()}.csv`,
			content: csv || 'export failed',
		},
	];

	for (const email of emails) {
		await sendEmail({
			to: email || '',
			subject: `A ${vendor} scan has completed!`,
			text: `A new ${vendor} scan has completed courtesy of keiserdev.com`,
			downloadId: report._id,
			attachments,
			replaceInfo: {
				homebuilder: vendor,
			},
		});
	}
}

export default handleEmails;
