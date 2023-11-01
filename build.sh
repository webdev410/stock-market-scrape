#!/bin/bash
#
# nexe -i ./index.js -o ./dist/stock-scrape -t node-18-x64-macos
# nexe index.js -r "public/**/*.html"

# nexe -i ./index.js -o getStockPrices --build
nexe index.js -r "public/**/*.html" --build
