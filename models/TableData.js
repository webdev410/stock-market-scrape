import { Schema, model } from 'mongoose';

const tableDataSchema = new Schema(
	{
		data: {},
	},
	{ timestamps: true }
);
const TableData = model('TableData', tableDataSchema);
export default TableData;
