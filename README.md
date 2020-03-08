# Website Screenshot App

Generate repeatable and beautiful screenshots of websites. Great for making images for your portfolio.

## Why

I wanted to grab some screenshots of some of my work for a portfolio. Snipping screenshots, making sure they were similar sizes, aspect ratios etc was a bit tedious. So as a developer what do I do? Spend 5 hours automating a 2 minute task!

## What

It's a NextJs app, but could easily be a simple react app with an express compatible server. Styled with styled-system and styled-components, its themable but I've only done one (poor) theme. It's not pretty itself, but it works. Also uses capture-website (which drives puppeteer) to get the screenshots, and some canvas functions to render the frame etc.

## Install

If you'd like to run this app as is, simply clone this repo

`git clone {repo_url}`

Install dependencies

`yarn install`

And run

`yarn dev`

## More

The app is a one page next app (see pages/index.js) with one api route (see pages/api/screenshot.js) which is called with some params to generate the screenshot. The api route sends back the screenshot as an image blob (binary) which is converted to a data url by the browser (so it won't work in some older browsers). Once the browser has the image blob, it sticks it in a canvas and then does some simple canvas drawing to add the frame.

### Other points of interest

The loading "spinner" thing is done with framer-motion for no good reason other than I liked it. In reality you probably wouldn't include a whole animation library just to do a loader.

The form validation is done with Hapi/joi, and it uses the same form validation universally (client/server) (yay javascript).

# TODO

- Add offset or scroll to #element
- Theme?
- Design it
- More frames?
- Investigate using Redis cache as a job queue to optimise screenshot generation (batch requests?)
- Websites with enter animations etc won't work
- Interact with something first (eg change theme?)
- Maybe record screen as well as screenshot?
- Take multiple at once (specify multiple urls)
- Fix canvas size for no frame (currently there's blank canvas)
- Tidy up frame rendering/choosing etc (it's all a bit messy)
- Add options to change frame width (sliders!) & fill
- Change frame selection from buttons to a bunch of options (dot position, frame fill, width, border radius etc)
