import cors from 'cors';
import express from 'express';
import init from './index.js';
import fs from 'fs';
const PORT = 5017;
const app = express();
app.use(cors());

app.get('/api/get-data', async (req, res) => {
	try {
		await init();

		return res.json({ success: true });
	} catch (error) {
		return res.status(500).json({ success: false, error });
	}
});
app.listen(PORT, () => {
	console.log('Example app listening on port 3000!');
	console.log(`http://localhost:${PORT}/api`);
});
