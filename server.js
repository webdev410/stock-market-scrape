import cors from 'cors';
import express from 'express';
import init from './index.js';
import fs from 'fs';
import archiver from 'archiver';
import path from 'path';

const PORT = 5017;
const app = express();
app.use(cors());

app.get('/api/get-data', async (req, res) => {
	try {
		await init();

		// After init, zip CSV files in the output directory
		const output = fs.createWriteStream('output.zip');
		const archive = archiver('zip', {
			zlib: { level: 9 }, // Compression level
		});

		// Listen for all archive data to be written
		output.on('close', function () {
			console.log(`Archive wrote ${archive.pointer()} bytes`);
			// Send the file to the client for download
			res.download(path.resolve('output.zip'));
		});

		// Catch errors with the archiving process
		archive.on('error', function (err) {
			throw err;
		});

		// Pipe archive data to the file
		archive.pipe(output);

		// Append files from a directory
		fs.readdirSync('./output').forEach((file) => {
			if (path.extname(file) === '.csv') {
				archive.file(path.join('./output', file), { name: file });
			}
		});

		// Finalize the archive (this will append files to the zip file)
		archive.finalize();
	} catch (error) {
		return res.status(500).json({ success: false, error });
	}
});

app.listen(PORT, () => {
	console.log(`App is listening on port ${PORT}!`);
	console.log(`http://localhost:${PORT}/api`);
	console.log(`http://localhost:${PORT}/api/get-data`);
});
