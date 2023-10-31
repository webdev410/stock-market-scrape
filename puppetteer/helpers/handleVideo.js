import { PuppeteerScreenRecorder } from 'puppeteer-screen-recorder';
import config from '../config.js';
import colors from '../../utils/colors.js';
import { logAction, logInfo } from './logAction.js';
const handleVideo = async (page, videoName = 'video') => {
	let recorder = null;
	if (config.supplyPro.video.record) {
		logAction(`${colors.yellow}recording video${colors.reset}`);
		recorder = new PuppeteerScreenRecorder(
			page,
			config.supplyPro.video.options
		);
		await recorder.start(`downloads/video/${videoName}.mp4`);
	} else {
		logInfo(`${colors.yellow}video recording is disabled${colors.reset}`);
	}
	return recorder;
};
export default handleVideo;
