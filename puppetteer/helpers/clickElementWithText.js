/**
 * Clicks an element with the given text on the page.

 */
const clickElementWithText = async (
	page,
	elementType = 'div',
	text = 'View More'
) => {
	const element = await page.waitForFunction(
		(text) => {
			const elements = Array.from(document.querySelectorAll(elementType));
			return elements.find((el) => el.textContent.includes(text));
		},
		{},
		text
	);
	return;
};

export default clickElementWithText;
