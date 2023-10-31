import colors from '../../utils/colors.js';
const logAction = (arg) =>
	console.log(`${colors.yellow}[ACTION]: ${arg}${colors.reset}`);
const logError = (arg) =>
	console.log(`${colors.red}[ERROR]: ${arg}${colors.reset}`);
const logInfo = (arg) =>
	console.log(`${colors.blue}[INFO]: ${arg}${colors.reset}`);
const logSuccess = (arg) =>
	console.log(`${colors.green}[SUCCESS]: ${arg}${colors.reset}`);
const logWarning = (arg) =>
	console.log(`${colors.yellow}[WARNING]: ${arg}${colors.reset}`);
const logPink = (args) =>
	console.log(`${colors.magenta}[LOG]: ${args}${colors.reset}`);
export { logAction, logError, logInfo, logSuccess, logWarning, logPink };
