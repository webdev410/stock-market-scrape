import fs from 'fs';

import { readFile, writeFile, appendFileSync, readdirSync } from 'fs';
import util from 'util';
// Promise version of fs.readFile
const readFromFile = util.promisify(readFile);
/**
 *  Function to write data to the JSON file given a destination and some content
 *  @param {string} destination The file you want to write to.
 *  @param {object} content The content you want to write to the file.
 *  @returns {void} Nothing
 */
const writeToFile = (destination, content) =>
	writeFile(destination, JSON.stringify(content, null, 4), (err) =>
		err ? console.error(err) : console.info(`\nData written to ${destination}`)
	);
/**
 *  Function to read data from a given a file and append some content
 *  @param {object} content The content you want to append to the file.
 *  @param {string} file The path to the file you want to save to.
 *  @returns {void} Nothing
 */
const readAndAppend = (content, file) => {
	readFile(file, 'utf8', (err, data) => {
		if (err) {
			console.error(err);
		} else {
			const parsedData = JSON.parse(data);
			parsedData.push(content);
			writeToFile(file, parsedData);
		}
	});
};

/**
 *
 *
 * @param {*} destination
 * @param {*} content
 */
const appendFile = (destination, content) => {
	appendFileSync(destination, content, (err) => {
		if (err) throw err;
		console.log('file saved');
	});
};
const readFileList = (directory) => {
	const fileList = [];
	return readdirSync(directory, (err, data) => {
		if (err) return console.error(err);
		data.forEach((file) => {
			fileList.push(file);
			console.log({ file });
		});
		console.log({ fileList });
		return fileList;
	});
};
const readFromFileSync = (path) => {
	fs.readFileSync(path, 'utf8', (err, data));
};

/**
 * Read a JSON file and append data to it
 *
 * @param {*} filename
 * @param {*} dataToAppend
 */
function appendToJsonFile(filename, dataToAppend) {
	// Read the file
	fs.readFile(filename, 'utf8', (err, data) => {
		if (err) {
			console.log(`Error reading file from disk: ${err}`);
		} else {
			// Parse the JSON file to a JavaScript object
			let databases = JSON.parse(data);

			// Check if the parsed data is an array
			if (!Array.isArray(databases)) {
				// If it's not an array, create a new array and add the existing data to it
				databases = [databases];
			}

			// Append the new data to the JavaScript object
			databases.push(dataToAppend);

			// Stringify the JavaScript object back to JSON
			const jsonString = JSON.stringify(databases, null, 2);

			// Write the JSON string back to file
			fs.writeFile(filename, jsonString, (err) => {
				if (err) {
					console.log(`Error writing file on disk: ${err}`);
				}
			});
		}
	});
}

export default {
	appendFile,
	appendToJsonFile,
	readFromFile,
	readFromFileSync,
	readFileList,
	writeToFile,
	readAndAppend,
};
