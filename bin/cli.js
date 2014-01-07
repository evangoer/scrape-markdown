#!/usr/bin/env node
var scrape = require('../index.js').scrape,
    optimist = require('optimist'),
    argv = optimist
            .usage('Usage: $0 -s [selector] [url]...')
            .alias('s', 'selector')
            .describe('s', 'Scrape HTML from each page using this selector')
            .argv;


function readStdin() {
    var data = '';
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    process.stdin.on('data', function (chunk) {
        data += chunk;
    });

    process.stdin.on('end', function () {
        if (data === '') {
            console.log('Please supply some URLs or pipe HTML to stdin.\n');
            optimist.showHelp();
            process.exit(1);
        }
        scrape(argv, data);
    });
}

if (argv._.length === 0) {
    readStdin();
} else {
    scrape(argv);
}
