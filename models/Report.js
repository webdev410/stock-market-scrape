import mongoose, { Schema, model } from 'mongoose';

const reportSchema = new Schema(
	{
		dateStarted: {
			type: Date,
			default: new Date(),
		},
		dateUpdated: {
			type: Date,
			default: null,
		},
		dateCompleted: {
			type: Date,
			default: null,
		},
		status: {
			type: String,
			default: 'running',
			enum: ['running', 'pending', 'complete', 'failed'],
		},
		vendor: String,
		tableDataIds: [{ type: Schema.Types.ObjectId, ref: 'TableData' }],
		csv: String,
	},
	{ timestamps: true }
);
const Report = model('Report', reportSchema);
export default Report;
