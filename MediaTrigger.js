/*
    MediaTrigger v.1.3
*/
class MediaTrigger {

	constructor(params){
        this.media = params.media;
        this.breakpoints = params.triggers;
        this.currentBreakpoint = 0;
        this._bindedCheck = this._check.bind(this);
    }

    _check() {
        this.ctime = this.media.currentTime;
        if (this.breakpoints[this.currentBreakpoint].triggerTime) {
            if (this.ctime >= this.breakpoints[this.currentBreakpoint].triggerTime) {
                this._triggerAction();
            }
        } else if (this.breakpoints[this.currentBreakpoint].triggerPercent) {
            if (this.breakpoints[this.currentBreakpoint].triggerPercent > 1) console.warn("[MediaTrigger] triggerPercents must be set between 0 and 1");
            else if (this.ctime / this.media.duration >= this.breakpoints[this.currentBreakpoint].triggerPercent) {
                this._triggerAction();
            }
        };
    }

    _triggerAction() {
        this.breakpoints[this.currentBreakpoint].action();
        this.currentBreakpoint++;

        if (this.currentBreakpoint > this.breakpoints.length - 1) this.stop();
    }

    start() {
        this.currentBreakpoint = 0;
        var that = this;
        this.media.addEventListener('timeupdate', this._bindedCheck);
    }

    stop() {
        this.media.removeEventListener('timeupdate', this._bindedCheck);
    }
}