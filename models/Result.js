import { Schema, model } from 'mongoose';

const ResultSchema = new Schema(
	{
		completed: [
			{
				type: String,
				default: '',
			},
		],
		failed: [
			{
				type: String,
				default: '',
			},
		],
		reportIds: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Report',
			},
		],
	},
	{ timestamps: true }
);
const Result = model('Result', ResultSchema);
export default Result;
