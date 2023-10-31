import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const db = async () => {
	try {
		const database = await mongoose.connect(
			process.env.MONGODB_URI || 'mongodb://localhost:27017/csv-scraper',
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
			}
		);
		console.log('Connected to MongoDB');
		return database;
	} catch (error) {
		// mongoose.connection.on('error', (err) => {
		// 	console.error('Could not connect to MongoDB:', err);
		// });
		return console.error(error);
	}
};
export default db;
