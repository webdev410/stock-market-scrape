import { logAction, logError, logInfo, logSuccess } from './logAction.js';
import wait from './wait.js';

async function handleLogin(
	page = null,
	loginUrl = 'https://login.drhorton.com/adfs/ls/?wtrealm=urn%3avendorsuite%3aweb&wctx=WsFedOwinState%3d53AY8p3UR-desnilczrZcJossoXAeCmp6h71GgmtGbKEKVu6X9xAX5uiGB-8H52APqkRBmZIHiMT44IGqU9WszVIujXMLqCHfD9WymH9rkgE_kNyWXbDw5z4uaCy6xCHKJpk2Zj_3ayIY2doIWJ9WA&wa=wsignin1.0#dashboard',
	usernameSelector = '#userNameInput',
	passwordSelector = '#passwordInput',
	usernameValue = 'alatone@aegisext.com',
	passwordValue = 'Siding123!',
	submitSelector = '#submitButton',
	maxTries = 5
) {
	let attempt = 1;
	if (!page) return logError('No page provided to handleLogin function');
	logAction('Logging in');
	await page.goto(loginUrl);
	const username = await page.waitForSelector(usernameSelector);
	const password = await page.waitForSelector(passwordSelector);
	const submit = await page.waitForSelector(submitSelector);
	await username.type(usernameValue);
	await password.type(passwordValue);
	await wait(1000);
	await submit.click();
	logSuccess('Login successful');
}
export default handleLogin;
