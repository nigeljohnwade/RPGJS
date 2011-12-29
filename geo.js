
function geo(){
	//geo attributes
	this.position;
	this.coords;
	//settings
	this.Google = false;
	this.diagnostic = false;
	}
	
geo.prototype.testForGeo = function(){
	try{
		if(!!navigator.geolocation){
			this.geo = navigator.geolocation;
			return 'Geolocation';
			}else{
				return 'No Geolocation';
			}
		}catch(e){
			return e;
			}
	}


geo.prototype.getPosition = function(){
	if(this.diagnostic) document.getElementById('status').innerHTML = 'Requesting Position';
	Geo.position = navigator.geolocation.getCurrentPosition(Geo.savePosition,Geo.errorPosition,{enableHighAccuracy:true, timeout: 60000, maximumAge: 5000});
	}

geo.prototype.watchPosition = function(){
	if(this.diagnostic) document.getElementById('status').innerHTML = 'Requesting Position';
	Geo.position = navigator.geolocation.watchPosition(Geo.savePosition,Geo.errorPosition,{enableHighAccuracy:true, timeout: 60000, maximumAge: 5000});
	}

geo.prototype.savePosition = function(position){
	Geo.coords = {
		"timestamp" : position.timestamp,
		"longitude" : position.coords.longitude,
		"latitude": position.coords.latitude,
		"accuracy": position.coords.accuracy,
		"altitude": position.coords.altitude
		}
		if(Geo.diagnostic) Geo.showPosition();
		if(Geo.Google) GoogleMap.googleMapPosition(true,true);
	}
	
geo.prototype.showPosition = function(){
	document.getElementById('status').innerHTML = '';
	document.getElementById('longitude').innerHTML = 'Longitude - ' + Geo.coords.longitude;
	document.getElementById('latitude').innerHTML = 'Latitude - ' + Geo.coords.latitude;
	document.getElementById('accuracy').innerHTML = 'Accuracy - ' + Geo.coords.accuracy;
	document.getElementById('altitude').innerHTML = 'Altitude - ' + Geo.coords.altitude;
	document.getElementById('timestamp').innerHTML = 'Time - ' + new Date(Geo.coords.timestamp).toLocaleDateString() + ' - ' + new Date(Geo.coords.timestamp).toLocaleTimeString();
	}

geo.prototype.googleMapPosition = function(){
	// TODO test for google maps
	geoWrapper = document.getElementById("geo-wrapper");
	var center = new google.maps.LatLng(Geo.coords.latitude, Geo.coords.longitude);
	var options = {
		"center":center,
		"mapTypeId": google.maps.MapTypeId.ROADMAP,
		"zoom": 14
		};
	var map = new google.maps.Map(document.getElementById("geo-wrapper"), options);
	var marker = new google.maps.Marker({
		  position: center,
		  title:"You are here!"
	  });
	marker.setMap(map);
	
	var contentString = '<div id="content">'+
		'<div id="siteNotice">'+
		'</div>'+
		'<h2 id="firstHeading" class="firstHeading">Combat</h2>'+
		'<div id="bodyContent">'+
		'<p><a href="combat_example.html">Combat Example</a></p>'+
		'</div>'+
		'</div>';
	
	var infowindow = new google.maps.InfoWindow({
		content: contentString
	});

	google.maps.event.addListener(marker, 'click', function() {
	  infowindow.open(map,marker);
	});

	}


geo.prototype.errorPosition = function(error){
	switch(error.code){
		case 1:
			document.getElementById('error').innerHTML = 'Permission Denied';
			break;
		case 2:
			$document.getElementById('error').innerHTML = 'Position Unavailable';
			break;
		case 3:
			document.getElementById('error').innerHTML = 'Request Timed Out';
			break;
		default:
			alert(error.code + ' - ' + error.message);
			break;
		}
	}

var Geo = new geo();
	
