import Result from '../../models/Result.js';
async function handleResults() {
	const results = await Result.create();
	return results;
}
export default handleResults;
