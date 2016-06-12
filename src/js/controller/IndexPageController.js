/*jslint browser: true*/
/*global console, GardenLink*/

GardenLink.angular.controller('IndexPageController', ['$scope', '$http', 'InitService','DataService','$interval',
function ($scope, $http, InitService,DataService,$interval) {
  'use strict';
  
  $scope.onItemClicked = function(objeto) {
  	if (objeto.Id) {
  		console.log("Device Clicked");
  		DataService.dispositivoClicked(objeto);	
  	}
  	
  	if (objeto.IdSensor) {
  		DataService.sensorClicked(objeto);
  	}
  	
  	if (objeto.IdRelay) {
  		
  		angular.forEach($scope.relays, function(value, key) {
		  
  		  if (value.IdRelay == objeto.IdRelay) {
  		  	$scope.relays[key].Activo = !$scope.relays[key].Activo;
  		  	var ret = DataService.relayClicked($scope.relays[key]);
  		  	console.log(ret);
  		  }
  		
		});
  	}
  	
  }
  
  
  
  
  DataService.addEventListener('relayClicked', function (relay) {
  			console.log("relayClicked listener : ");
  		});
  
   
   var $$ = Dom7;
   
  
  function TraerDatos(){
  	   DataService.getData().then(function(result) {
	   		$scope.dispositivos = result.data.Dispositivos;
	   		$scope.sensores = result.data.Sensores;
	   		$scope.relays = result.data.Relays;
	   }, function(error) {
	   	console.log(error);
	   });
  };
  
  InitService.addEventListener('ready', function () {
		 TraerDatos();
		$scope.Reload = function () {
		    TraerDatos();
		 };
	   
	   $interval(function() { $scope.Reload(); }, 30000);
  });
  
}]);