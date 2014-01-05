#!/usr/bin/env node
var scrape = require('../index.js').scrape,
    optimist = require('optimist'),
    argv = optimist
            .usage('Usage: $0 -s [selector] [url]...')
            .alias('s', 'selector')
            .describe('s', 'Scrape HTML from each page using this selector')
            .argv;

if (argv._.length === 0) {
    console.log('No HTML to scrape! Please supply a URL.\n');
    optimist.showHelp();
    process.exit(1);
}

scrape(argv);
