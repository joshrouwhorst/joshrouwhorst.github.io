---
ordinal: "400"
showInNav: true
path: qbp
title: qbp
projectUrl: /qbp-package/main
openInNewTab: false
technologies: JavaScript, NodeJS
---
When working on node projects I often find myself wanting to process a lot of records asynchronously and in batches. For example, if I was working on a script that crawled webpages and scraped data, I might collect a list of links on the page and maybe I want to check to see if we have already queued them up to be scanned, then save them to a MongoDB database. 

I kept rebuilding the same basic structure for doing this over and over, so eventually I turned it into [an NPM package](https://www.npmjs.com/package/qbp).

With qbp I can create a process that I can easily add items to, pause, resume, and get information on its progress.

I found with a little tweaking I could also have it handle rate limiting as well. So if I only want 100 records processed per minute I can easily specify that.

The [NPM page](https://www.npmjs.com/package/qbp) has detailed information and examples for the package. Click the Start button to see **a basic demo** of this package in action.