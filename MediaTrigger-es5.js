/**
 * MediaTrigger v.2.0.5
 */
(function (window, document, undefined) {
    function MediaTrigger(params) {
        this.params = params;
        this.startASAP = false;
        this.media = params.media;
        this._getMediaDuration(params.triggers);
        this.currentTrigger = 0;
        this._bindedCheck = this._check.bind(this);
    }

    MediaTrigger.prototype._getMediaDuration = function() {
        if (Number.isNaN(this.media.duration)) {
            this.media.addEventListener('durationchange', function() {
                this.mediaDuration = this.media.duration;
                this.triggers = this._sortTriggers(this._handleTriggers());
                if (this.startASAP) {
                    this.media.addEventListener('timeupdate', this._bindedCheck);                
                    this.media.addEventListener('ended', this._bindedCheck);
                }
            }.bind(this));
        } else {
            this.mediaDuration = this.media.duration;
            this.triggers = this._sortTriggers(this._handleTriggers());
        }
    }

    /**
     * Converts percent-based triggers to time-based triggers
     * and store them in a uniform array of objects. 
     */
    MediaTrigger.prototype._handleTriggers = function() {
        var handledTriggers = [];
        this.params.triggers.forEach(function(trigger) {
            var unit = trigger[0].slice(-1);
            switch (unit) {
                case 's': 
                    handledTriggers.push({
                        triggerTime: parseFloat(trigger[0].slice(0, trigger[0].length-1)), 
                        action: trigger[1]
                    });
                    break;
                case '%': 
                    var triggerPercent = parseFloat(trigger[0].slice(0, trigger[0].length-1)) / 100;
                    handledTriggers.push({
                        triggerTime: this.mediaDuration * triggerPercent,
                        action: trigger[1]
                    });
                    break;
                default:
                    console.warn("[MediaTrigger] Trigger unit not recognized. Try 's' or '%'.");
            }
        }.bind(this));
        return handledTriggers;
    }

    /**
     * Sort triggers chronologically.
     */
    MediaTrigger.prototype._sortTriggers = function (triggers) {
        function compare( a, b ) {
            if ( a.triggerTime < b.triggerTime ){
              return -1;
            }
            if ( a.triggerTime > b.triggerTime ){
              return 1;
            }
            return 0;
        }
        
        return triggers.sort(compare);
    }
    
    MediaTrigger.prototype._check = function () {        
        if (this.triggers[this.currentTrigger].triggerTime >= 0) {
            if (this.media.currentTime >= this.triggers[this.currentTrigger].triggerTime) {
                this._triggerAction();
            }
        }
    }

    MediaTrigger.prototype._triggerAction = function () {
        this.triggers[this.currentTrigger].action();
        this.currentTrigger++;

        if (this.currentTrigger > this.triggers.length - 1) this.stop();
    }

    MediaTrigger.prototype.start = function () {
        this.currentTrigger = 0;
        if (this.mediaDuration != undefined) {
            this.media.addEventListener('timeupdate', this._bindedCheck);
            this.media.addEventListener('ended', this._bindedCheck);
        }
        else {
            this.startASAP = true;
        }
    }

    MediaTrigger.prototype.stop = function () {
        this.media.removeEventListener('timeupdate', this._bindedCheck);
        this.media.removeEventListener('ended', this._bindedCheck);
    }

    window.MediaTrigger = MediaTrigger;
})(window, document);