/*
    MediaTrigger v.1.2
*/
class MediaTrigger {
	constructor(params){
        this.media = params.media;
        this.breakpoints = params.triggers;
        this.currentBreakpoint = 0;
        this.timeInterval = params.precision;
        this.logs = (typeof params.logs == "boolean") ? params.logs : false;
    }

    _check() {
        if (this.logs) console.log("[MediaTrigger] " + this.media.currentTime);
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
        if (this.logs && typeof this.breakpoints[this.currentBreakpoint].name != undefined) console.warn("[MediaTrigger] " + this.breakpoints[this.currentBreakpoint].name);
        this.breakpoints[this.currentBreakpoint].action();
        this.currentBreakpoint++;

        if (this.currentBreakpoint > this.breakpoints.length - 1) clearInterval(this.interval);
    }

    start() {
        this.currentBreakpoint = 0;
        var that = this;
        this.interval = setInterval(function () {
            that.ctime = that.media.currentTime;
            that._check();
        }, this.timeInterval);
    }

    stop() {
        clearInterval(this.interval);
    }
}