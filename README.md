# bk-scrape

might work

```bash
execute bk-scrape
```

otherwise:

1. download nodejs
2. download this repo
3. run `npm install` in the repo directory
4. run `npm start` in the repo directory

From Barchart:

| Index   | URL                                                                                               |
| ------- | ------------------------------------------------------------------------------------------------- |
| S&P 500 | https://www.barchart.com/stocks/indices/sp/sp500?viewName=main                                    |
| Russ 2k | https://www.barchart.com/stocks/indices/russell/russell2000?viewName=main                         |
| DJ      | https://www.barchart.com/stocks/quotes/$DOWI/components?viewName=main&orderBy=symbol&orderDir=asc |
| NDX     | https://www.barchart.com/stocks/indices/nasdaq/nasdaq100?viewName=main                            |

From websites other than Barchart:

| Index          | URL                                                                              |
| -------------- | -------------------------------------------------------------------------------- |
| NIK225         | https://indexes.nikkei.co.jp/en/nkave/index/component                            |
| Euro Stoxx 50  | https://www.dividendmax.com/market-index-constituents/euro-stoxx-50              |
| Euro Stoxx 600 | https://www.marketscreener.com/quote/index/STOXX-EUROPE-600-EUR-7477/components/ |

## excel snippet

'''js

    Excel.run(async (context) => {
    // Get the active worksheet
    let sheet = context.workbook.worksheets.getActiveWorksheet();

    // Make an HTTP request to get the CSV data
    const response = await fetch('https://bk.keiserdev.com/sp500');
    const csvText = await response.text();

    // Assuming the CSV data is separated by commas and new lines
    const csvRows = csvText.trim().split('\n').map(row => row.split(','));

    // Find the range to place the data based on the size of the CSV
    const rowCount = csvRows.length;
    const columnCount = csvRows[0].length;
    const dataRange = sheet.getRangeByIndexes(0, 0, rowCount, columnCount);
    
    // Set the CSV data in the worksheet
    dataRange.values = csvRows;

    // Format the header to stand out
    const headerRange = sheet.getRangeByIndexes(0, 0, 1, columnCount);
    headerRange.format.fill.color = "#4472C4";
    headerRange.format.font.color = "white";
    headerRange.format.font.bold = true;

    await context.sync();
}).catch(error => {
    console.error(error);
});
'''