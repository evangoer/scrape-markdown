var jsdom = require('jsdom'),
    md = require('html-md'),
    config = {};

// TODO make user-configurable
function toHTML(win) {
    var nodes = win.document.querySelectorAll(config.selector);
    return Array.prototype.reduce.call(nodes, function (html, node) {
        return html + node.innerHTML;
    }, '');
}

function toMarkdown(error, win) {
    if (error) {
        console.error('ERROR: Cannot process HTML for URL ' + win.location);
        console.error(error);
    } else {
        console.log(md(toHTML(win)));
    }
}

function scrape(argv) {
    config.selector = argv.selector || 'body';
    config.urls = argv._;
    config.urls.forEach(function (url) {
        jsdom.env(url, toMarkdown);
    });
}

exports.scrape = scrape;
