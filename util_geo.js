/** Converts numeric degrees to radians */
		if (typeof(Number.prototype.toRad) === "undefined") {
		  Number.prototype.toRad = function() {
			return this * Math.PI / 180;
		  }
		}
		
		/** Converts radians to numeric (signed) degrees */
		if (typeof(Number.prototype.toDeg) === "undefined") {
		  Number.prototype.toDeg = function() {
			return this * 180 / Math.PI;
		  }
		}
		
		function calculateBearingAndDistance(lat1,lat2,lon1,lon2){
			var R = 6371; // km
			var dLat = (lat2-lat1).toRad();
			var dLon = (lon2-lon1).toRad();
			lat1 = lat1.toRad();
			lat2 = lat2.toRad();
			
			//distance
			var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
					Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
			var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
			var d = R * c;
			
			//bearing
			var y = Math.sin(dLon) * Math.cos(lat2);
			var x = Math.cos(lat1)*Math.sin(lat2) -
					Math.sin(lat1)*Math.cos(lat2)*Math.cos(dLon);
			var b = Math.atan2(y, x).toDeg();
			
			return {distance:d,bearing:b};
		}