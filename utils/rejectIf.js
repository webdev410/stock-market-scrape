const rejectIf = (condition, message) => {
	if (condition) {
		throw new Error(message);
	}
};
export default rejectIf;
