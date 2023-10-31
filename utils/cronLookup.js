const cronLookup = (frequency) => {
	let cronExpression;
	switch (frequency) {
		case 'never':
			cronExpression = '';
			break;
		case 'now':
			cronExpression = '*/1 * * * *';
			break;
		case '1m':
			cronExpression = '*/1 * * * *';
			break;
		case '5m':
			cronExpression = '*/5 * * * *';
			break;
		case '15m':
			cronExpression = '*/15 * * * *';
			break;
		case '30m':
			cronExpression = '*/30 * * * *';
			break;
		case '1h':
			cronExpression = '0 */1 * * *';
			break;
		case '12h':
			cronExpression = '0 */12 * * *';
			break;
		case '24h':
			cronExpression = '0 0 */1 * *';
			break;
		case '1w':
			cronExpression = '0 0 */7 * *';
			break;
		case 'mwf':
			// cron for monday wednesday and friday
			cronExpression = '0 0 */3 * *';
			break;
		case 'tth':
			// cron for tuesday and thursday
			cronExpression = '0 0 */2 * *';
			break;

		default:
			cronExpression = '0 */12 * * *';
			break;
	}
	return cronExpression;
};
export default cronLookup;
