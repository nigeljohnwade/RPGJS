timer = function(timeOut,step,callback){
	
	this.t = 0;
	this.elapsed = 0;
	this.timeString = '';
	this.timeOut = timeOut || 0;
	this.step = step || 1000;
	this.callback = callback || null;
	this.identifier = null;

	}

timer.prototype.updateTimer = function(){
	this.elapsed = (new Date().getTime()) - this.t;
	if(this.elapsed > this.timeOut){
		this.elapsed = null;
		clearInterval(this.identifier);
		this.timedOut();
		}
	}

timer.prototype.timedOut = function(){
	this.t = null;
	if(this.callback !== null){
		eval(this.callback);
		}
	}

timer.prototype.startTimer = function(){
	this.t = new Date().getTime();
	this.identifier = setInterval(timer.prototype.updateTimer,this.step);
	}
	
timer.prototype.getTimerElapsed = function(){
	return this.elapsed;
	}
	
timer.prototype.getTimeString = function(){
	this.elapsed = new Date(new Date().getTime() - this.t);
	this.timeString = (this.elapsed.getMinutes() > 0) ? this.elapsed.getMinutes() + ':' : '00:';
	//use padding or some better js?
	this.timeString +=  (this.elapsed.getSeconds() < 10) ? '0' + this.elapsed.getSeconds() : this.elapsed.getSeconds();
	return this.timeString;
	}
	
