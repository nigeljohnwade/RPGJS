function rpgConsole(id){

	this.content = [];
	this.writeCount = 0;
	this.id = id;
	this.output = '';
	
	}

rpgConsole.prototype.log = function(theClass,theString){
	this.writeCount = this.content.unshift({"theClass": theClass, "theText": theString});
	var outputTemplate = '<p class="{theClass}">{theText}</p>';
	for(a in this.content[0]){
		outputTemplate = outputTemplate.replace('{' + a + '}',this.content[0][a]);
		}
	this.output = outputTemplate + this.output;
	}

rpgConsole.prototype.display = function(){
	document.getElementById(this.id).innerHTML = this.output;
	}