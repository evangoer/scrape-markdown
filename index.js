var url = require('url'),
    jsdom = require('jsdom'),
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

function parseDOM(data) {
    var src = url.parse(data);
    if (src.host && src.protocol) {
        config.fromURL = ' from ' + url.format(src);
    }
    jsdom.env(data, toMarkdown);
}

function scrape(argv, data) {
    config.selector = argv.selector || 'body';

    if (data) {
        parseDOM(data);
    } else {
        argv._.forEach(parseDOM);
    }
}

exports.scrape = scrape;
