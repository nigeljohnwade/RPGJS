function GoogleMap(){
	

}

GoogleMap.prototype.googleMapPosition = function(marker,info){
	// TODO test for google maps
	geoWrapper = document.getElementById("geo-wrapper");
	this.center = new google.maps.LatLng(Geo.coords.latitude, Geo.coords.longitude);
	this.options = {
		"center":this.center,
		"mapTypeId": google.maps.MapTypeId.TERRAIN,
	    disableDefaultUI: true,
		disableDoubleClickZoom:true,
		draggable:false,
		scrollwheel:false,
		"zoom": 20
		};
		

	this.map = new google.maps.Map(document.getElementById("geo-wrapper"), this.options);
	var styleArray = [
		{
			featureType: "road",
			elementType: "all",
			stylers:[
			  { visibility: "off" }
			]
		  },{
			featureType: "transit",
			elementType: "all",
			stylers:[
			  { visibility: "off" }
			]
		  },{
			featureType: "administrative",
			elementType: "all",
			stylers:[
			  { visibility: "off" }
			]
		  },{
			featureType: "poi",
			elementType: "all",
			stylers:[
			  { visibility: "off" }
			]
		  },{
			featureType: "water",
			elementType: "labels",
			stylers:[
			  { visibility: "off" }
			]
		  },{
			featureType: "landscape",
			elementType: "labels",
			stylers:[
			  { visibility: "off" }
			]
		  }
		];
	this.map.setOptions({styles: styleArray});
	if(marker == true){
		var positionMarker = new google.maps.Marker({
			  position: this.center,
			  title:"You are here!"
		});
		positionMarker.setMap(this.map);
		}
	if(info == true){
		this.setInfoWindow(positionMarker);
		}
	}

GoogleMap.prototype.setInfoWindow = function(marker,contentString){
	if(!contentString){
		contentString = '<div id="content">'+
			'<div id="siteNotice">'+
			'</div>'+
			'<h2 id="firstHeading" class="firstHeading">Encounter</h2>'+
			'<div id="bodyContent">'+
			'<p><a href="combat_example.html">Random Enemy</a></p>'+
			'</div>'+
			'</div>';
		}
	
	var infowindow = new google.maps.InfoWindow({
		content: contentString
		});

	google.maps.event.addListener(marker, 'click', function() {
		infowindow.open(this.map,marker);
		});

	}
	
var GoogleMap = new GoogleMap();