export default class MediaTrigger {
	constructor(params) {
		this.media = params.media;
		this.breakpoints = params.triggers;
		this.timeInterval = params.precision;
		this.logs = (typeof params.logs == "boolean") ? params.logs : false;
	}

	_check() {
		if (this.logs) console.log("[MediaTrigger] "+this.media.currentTime);
		if (this.ctime >= this.breakpoints[0].triggerTime) {
			if (this.logs && typeof this.breakpoints[0].name != undefined) console.warn("[MediaTrigger] "+this.breakpoints[0].name);
			this.breakpoints[0].action();
			this.breakpoints.shift();
			if (this.breakpoints.length <= 0) clearInterval(this.interval);
		}
	}

	listen() {
		var that = this;
		this.interval = setInterval(function(){
			that.ctime = that.media.currentTime;
			that._check();
		}, this.timeInterval);
	}
}





