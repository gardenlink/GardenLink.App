/*jslint browser: true*/
/*global console, Framework7, GardenLink, $document*/

GardenLink.angular.factory('DataService', ['$document','$http', function ($document,$http) {
  'use strict';
  
	var srv1 = {},
		eventListeners = {
			'dispositivoClicked' : [],
			'sensorClicked' : [],
			'relayClicked' : []
		};
	
	/* Loose Copuling */
	srv1.addEventListener = function (eventName, callback) {
		eventListeners[eventName].push(callback); 
	};
	
	
	srv1.dispositivoClicked = function (dispositivo) {
		console.log("click dispositio");
		for (var i=0; i<eventListeners.dispositivoClicked.length; i++) {
			eventListeners.dispositivoClicked[i](dispositivo );
		} 
	};
	
	srv1.sensorClicked = function (sensor) {
		console.log("click sensor");
		for (var i=0; i<eventListeners.sensorClicked.length; i++) {
			eventListeners.sensorClicked[i](sensor );
		} 
	};
	
	srv1.relayClicked = function (relay) {
		
		//return srv1.putDataRelay(relay);
		
		for (var i=0; i<eventListeners.relayClicked.length; i++) {
			eventListeners.relayClicked[i](relay );
		} 
		
	};
	
	
	srv1.getData = function() {
		return $http.get('http://gardenlink.cl:9000/api/v1/servicio/consolidado');
	};
	
	srv1.getDataRelay = function() {
		return $http.get('http://gardenlink.cl:9000/api/v1/servicio/relays');
	};
	
	srv1.getDataSensores = function(id) {
		if (id)
			return $http.get('http://gardenlink.cl:9000/api/v1/servicio/sensores/' + id);
		else		
			return $http.get('http://gardenlink.cl:9000/api/v1/servicio/sensores');
	};
	
	srv1.getDataMotores = function(id) {
		if (id)
			return $http.get('http://gardenlink.cl:9000/api/v1/servicio/motores/' + id);
		else		
			return $http.get('http://gardenlink.cl:9000/api/v1/servicio/motores');
	};
	
	srv1.putDataRelay = function(relay, callback) {
	
		
		var data = {
    		path : "Activo", //debe venir sin comillas
    		value : relay.Activo
		};
		$http.patch('http://gardenlink.cl:9000/api/v1/servicio/relays/' + relay.IdRelay, data).success(function(data)
		{
			console.log(data);
			
			callback(null, data);
			
			
		});
		

	};
	
	
	
	
	return srv1;
	
	
	
	
  
}]);