import jsdom from 'jsdom';
const { JSDOM } = jsdom;
/**
 * ```js
 * 
// Example usage:
const htmlMarkup = `
  <!DOCTYPE html>
  <html>
  <head>
    <title>Sample Page</title>
  </head>
  <body>
    <input id="username" type="text"/>
    <input id="password" type="password"/>
    <button id="loginBtn">Login</button>
    <a id="forgotPassword" href="#">Forgot Password?</a>
    <table id="dataTable">
      <tr>
        <th>Name</th>
        <th>Email</th>
      </tr>
      <tr>
        <td>John</td>
        <td>john@example.com</td>
      </tr>
      <tr>
        <td>Jane</td>
        <td>jane@example.com</td>
      </tr>
    </table>
  </body>
  </html>
`;

const puppeteerScript = generatePuppeteerScript(htmlMarkup);
console.log(puppeteerScript);

```
 * @param {string} htmlMarkup 
 * @returns 
 */
const generatePuppeteerScript = (htmlMarkup) => {
	const dom = new JSDOM(htmlMarkup);
	const document = dom.window.document;

	let puppeteerScript = `
  const puppeteer = require('puppeteer');

  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
  
    await page.goto('http://example.com'); // Replace with your URL
  `;

	const inputElements = document.querySelectorAll('input');
	const buttonElements = document.querySelectorAll('button');
	const anchorElements = document.querySelectorAll('a');
	const tableElements = document.querySelectorAll('table');

	inputElements.forEach((input, index) => {
		const id = input.id || `input_${index}`;
		puppeteerScript += `
    await page.type('#${id}', 'YourValueHere');
    `;
	});

	buttonElements.forEach((button, index) => {
		const id = button.id || `button_${index}`;
		puppeteerScript += `
    await page.click('#${id}');
    `;
	});

	anchorElements.forEach((anchor, index) => {
		const id = anchor.id || `anchor_${index}`;
		puppeteerScript += `
    await page.click('#${id}');
    `;
	});

	if (tableElements.length > 0) {
		puppeteerScript += `
    // Scrape table data
    const tableData = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll('table tr'));
      return rows.map(row => {
        const columns = row.querySelectorAll('td');
        return Array.from(columns, column => column.innerText);
      });
    });
    console.log(tableData);
    `;
	}

	puppeteerScript += `
    await browser.close();
  })();
  `;

	return puppeteerScript;
};
export default generatePuppeteerScript;
