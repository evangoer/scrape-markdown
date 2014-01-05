var jsdom = require('jsdom'),
    md = require('html-md'),
    config;

function scrape(argv) {
    config = argv;
    config.urls = argv._;
    return config;
}

exports.scrape = scrape;
