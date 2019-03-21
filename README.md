Description
==================
This class allows callback functions to be triggered at specific time points in an audio or video file.
Time points can be defined in seconds or percents.

Usage
==================

```javascript
var audio = new Audio([URLString]);
var mediaTrigger = new MediaTrigger(
    {
        media: audio, 
        precision: 20, // The lower the value, the more precise it will be. You probably shouldn't go under 15 though.
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