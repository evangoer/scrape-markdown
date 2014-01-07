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
        console.error('ERROR: Cannot process HTML' + (config.fromURL || ''));
        console.error(error);
    } else {
        console.log(md(toHTML(win)));
    }
}

function scrape(argv, html) {
    config.selector = argv.selector || 'body';

    if (html) {
        jsdom.env(html, toMarkdown);
    } else {
        argv._.forEach(function (url) {
            config.fromURL = ' from ' + url;
            jsdom.env(url, toMarkdown);
        });
    }
}

exports.scrape = scrape;
