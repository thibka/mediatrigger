# Description
This class allows callback functions to be triggered at specific time points in an audio or video file.
Time points can be defined in seconds or percents.

# Install

## ES5
```html
<script src="https://cdn.jsdelivr.net/npm/@thibka/mediatrigger@2.0.2/MediaTrigger-es5.min.js"></script>
```
## Webpack
```bash
npm i @thibka/mediatrigger
```

# Usage
```javascript
var mediaTrigger = new MediaTrigger({
    media: document.querySelector('video'), 
    triggers: [
        ['2.5s', function(){ 
            // ...
        }], 
        ['25%', function(){ 
            // ...
        }]
    ]
});

mediaTrigger.start();
// mediaTrigger.stop();
```