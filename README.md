# scrape-markdown

A simple utility for scraping web pages or raw HTML data and returning the results in Markdown.

## Installation

Install using npm:

    $ npm install scrape-markdown

## Usage

    scrape-markdown -h -s [selector] [url|file|html]...

**scrape-markdown** accepts one or more URLs, filepaths, or HTML strings.
If you supply an HTML string, **scrape-markdown** converts the data to Markdown directly. 
If you supply a URL or filepath, **scrape-markdown** attempts to fetch the contents first.

### -h, --help

Displays a usage statement.

### -s, --selector

Scrapes HTML from each page using the specified CSS selector.
This extracts all nodes on the page using `querySelectorAll`
and concatenates the `innerHTML` from each matching node.
The default selector is 'body'.

A given call of **scrape-markdown** only accepts a single selector.
If you need to apply different selectors to different pages,
you should invoke **scrape-markdown** multiple times.

Depending on your selector, you might need to enclose the value in quotes.
For example, a selector of `h1` does not require special treatment,
but `h1 a` or `#main` must be quoted.

## Examples

### Convert the Yahoo! and Google homepages to Markdown

    $ scrape-markdown http://yahoo.com http://google.com

### Extract all Express API documentation

    $ scrape-markdown --selector "#right" http://expressjs.com/api.html

### Convert an arbitrary string to Markdown

    $ echo "<h1>Hello</h1>" | scrape-markdown

or 

    $ scrape-markdown "<h1>Hello</h1>"

### Scrape all warning divs out of a local file

    $ scrape-markdown --selector .warning path/to/file.html

or

    $ cat path/to/file.html | scrape-markdown --selector .warning 

### Fetch and scrape a page using curl

    $ curl http://example.com | scrape-markdown --selector .content

**scrape-markdown** can fetch URLs on its own, but it doesn't provide you
any fine-grained control. If you need to use retries, set HTTP headers,
etc, you can use a more powerful utility such as **curl** or **wget** and
pipe the output to **scrape-markdown**.

### Get all unordered lists in a collection of local HTML files

    find . -name "*.html" | xargs scrape-markdown --selector ul

## License

This software is free to use under a 3-clause BSD license.
See the [LICENSE](./LICENSE) file for license text and copyright information.
