# Description
This class allows callback functions to be triggered at specific time points in an audio or video file.
Time points can be defined in seconds or percents.

# Install

## ES5
```html
<script src="https://cdn.jsdelivr.net/npm/@thibka/mediatrigger@1.3.2/MediaTrigger-es5.min.js"></script>
```
## Webpack
```bash
npm i @thibka/mediatrigger
```

# Usage
```javascript
var mediaTrigger = new MediaTrigger(
    {
        media: new Video([URLString]), 
        triggers: [
            {	
                triggerTime: 2.5, // In seconds
                action: function(){ 
                    // ...
                }
            },
            {	
                triggerPercent: .25, // Between 0 and 1 
                action: function(){ 
                    // ...
                }
            }
        ]
    });

mediaTrigger.start();
mediaTrigger.stop();
```