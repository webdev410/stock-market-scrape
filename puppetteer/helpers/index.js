import authenticate from './authenticate.js';
import cleanData from './cleanData.js';
import clickElement from './click3HouseBtn.js';
import clickElementWithText from './clickElementWithText.js';
import createReport from './createReport.js';
import doesTextExist from './doesTextExist.js';
import evaluateFunction from './evaluateFunction.js';
import exposeFunction from './exposeFunction.js';
import fillInput from './fillInput.js';
import focusElement from './focusElement.js';
import getById from './getById.js';
import getFrames from './getFrames.js';
import getHtmlContent from './getHtmlContent.js';
import getMetrics from './getMetrics.js';
import handleConsoleLogs from './handleConsoleLogs.js';
import handleElements from './handleElements.js';
import initPage from './initPage.js';
import pressKey from './pressKey.js';
import querySelector from './querySelector.js';
import querySelectorAll from './querySelectorAll.js';
import reloadPage from './reloadPage.js';
import resetDb from './resetDb.js';
import scrapeTableData from './scrapeTableData.js';
import scrollElement from './scrollElement.js';
import selectAndClickButton from './selectAndClickButton.js';
import setUserAgent from './setUserAgent.js';
import typeText from './typeText.js';
import wait from './wait.js';
import waitForElement from './waitForElement.js';

export default {
	authenticate,
	cleanData,
	createReport,
	initPage,
	resetDb,
	scrapeTableData,
	wait,
	evaluateFunction,
	exposeFunction,
	getFrames,
	getHtmlContent,
	pressKey,
	querySelector,
	querySelectorAll,
	reloadPage,
	scrollElement,
	selectAndClickButton,
	setUserAgent,
	typeText,
	waitForElement,
	clickElement,
	clickElementWithText,
	doesTextExist,
	handleConsoleLogs,
	handleElements,
	fillInput,
	focusElement,
	getMetrics,
	getById,
};
