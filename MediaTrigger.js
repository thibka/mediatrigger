/*
    MediaTrigger v.2.0.2
*/
export default class MediaTrigger {
    constructor(params) {
        this.params = params;
        this.startASAP = false;
        this.media = params.media;
        this._getMediaDuration(params.triggers);
        this.currentTrigger = 0;
        this._bindedCheck = this._check.bind(this);
    }

    _getMediaDuration() {
        if (Number.isNaN(this.media.duration)) {
            this.media.addEventListener('durationchange', () => {
                this.mediaDuration = this.media.duration;
                this.triggers = this._sortTriggers(this._handleTriggers());
                if (this.startASAP) this.media.addEventListener('timeupdate', this._bindedCheck);
            });
        } else {
            this.mediaDuration = this.media.duration;
            this.triggers = this._sortTriggers(this._handleTriggers());
        }
    }

    /**
     * Converts percent-based triggers to time-based triggers
     * and store them in a uniform array of objects. 
     */
    _handleTriggers() {
        const handledTriggers = [];
        this.params.triggers.forEach(trigger => {
            const unit = trigger[0].slice(-1);
            switch (unit) {
                case 's':
                    handledTriggers.push({
                        triggerTime: parseFloat(trigger[0].slice(0, trigger[0].length - 1)),
                        action: trigger[1]
                    });
                    break;
                case '%':
                    const triggerPercent = parseFloat(trigger[0].slice(0, trigger[0].length - 1)) / 100;
                    handledTriggers.push({
                        triggerTime: this.mediaDuration * triggerPercent,
                        action: trigger[1]
                    });
                    break;
                default:
                    console.warn("[MediaTrigger] Trigger unit not recognized. Try 's' or '%'.");
            }
        });
        return handledTriggers;
    }

    /**
     * Sort triggers chronologically.
     */
    _sortTriggers(triggers) {
        function compare({ triggerTime }, { triggerTime }) {
            if (triggerTime < triggerTime) {
                return -1;
            }
            if (triggerTime > triggerTime) {
                return 1;
            }
            return 0;
        }

        return triggers.sort(compare);
    }

    _check() {
        if (this.triggers[this.currentTrigger].triggerTime >= 0) {
            if (this.media.currentTime >= this.triggers[this.currentTrigger].triggerTime) {
                this._triggerAction();
            }
        }
    }

    _triggerAction() {
        this.triggers[this.currentTrigger].action();
        this.currentTrigger++;

        if (this.currentTrigger > this.triggers.length - 1) this.stop();
    }

    start() {
        this.currentTrigger = 0;
        if (this.mediaDuration != undefined) {
            this.media.addEventListener('timeupdate', this._bindedCheck);
        }
        else {
            this.startASAP = true;
        }
    }

    stop() {
        this.media.removeEventListener('timeupdate', this._bindedCheck);
    }
}
