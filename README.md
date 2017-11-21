Image-click uses [progressive image loading technology](https://github.com/registerguard/progressive-image.js) to lazy load images in a number of different ways on registerguard.com. This repo is for testing and it will be built into Bulldog eventually.

There might be single imgaes on a story page and multiple images on a story page and gallery page. These images can be called from DT or SSP.

Gulp is being used as a build tool to leverage mustache templating and browser-sync.

# Getting started

```
# Clone repo 
git clone https://github.com/registerguard/image-click.git

# Install yarn if you don't have it (would also work with npm)
brew install yarn

# Install dev dependencies
yarn || npm install

# Start gulp server
gulp serve
```

### Testing for a click-to-expand image user interface.

# Basic plan:

![img_1051](https://user-images.githubusercontent.com/4853944/31570285-30f50630-b037-11e7-8efa-416eec1a6da6.JPG)
![img_1052](https://user-images.githubusercontent.com/4853944/31570284-30deb754-b037-11e7-8e4f-9ea87035e3a5.JPG)


# TODO
  - [x] Add in progressive image loading
    - Questions:
      - How does prog work with display: none?
        - Once loaded, they stay loaded
      - Will prog load the low-res before the images are expanded
        - Low res versions are loaded on page load, this is ok (not great but whatevs)
  - [ ] Style
    - Questions:
      - Can we absolute position the close button to top? Side? Bottom?
      - Can we disappear close after you scroll past the final image?
      - How will this look on desktop?
      - Need simple icon to expand on 300-wide photo
