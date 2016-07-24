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
		  console.log("ciclo");
  		  if (value.IdRelay == objeto.IdRelay) {
  		  	$scope.relays[key].Activo = !$scope.relays[key].Activo;
  		  	DataService.relayClicked($scope.relays[key]);
  		  }
		});
  	}
  	
  }
  
  
  
  
  DataService.addEventListener('relayClicked', function (relay) {
  			DataService.putDataRelay(relay, function(error, data) {
  				if (relay.Activo != data.Activo) {
	  				var opt = { Relay : true };
	  				TraerDatos(opt);
  				}
  			});
  			
  		});
  
   
   var $$ = Dom7;
   
  
  function TraerDatos(opt){
  	   
  	   console.log(GardenLink);
  	   	GardenLink.fw7.app.showPreloader();
  	   
  	   if (opt && opt.Relay && opt.Relay == true)
  	   {
  	   		$scope.relays = null;
  	   		DataService.getDataRelay().then(function(result) {
  	   			console.log(result.data);
  	   			$scope.relays = result.data;
  	   			GardenLink.fw7.app.hidePreloader();
  	   		});
  	   		
  	   }
  	   else
  	   {
		  //full reload
	  	   $scope.dispositivos = null;
	  	   $scope.sensores = null;
	  	   $scope.motores = null;
	  
	  	   DataService.getData().then(function(result) {
		   		$scope.dispositivos = result.data.Dispositivos;
		   		$scope.sensores = result.data.Sensores;
		   		$scope.relays = result.data.Relays;
		   		$scope.motores = result.data.Motores;
		   		GardenLink.fw7.app.hidePreloader();
		   }, function(error) {
		   	console.log(error);
		   });
	   }
  };
  
  InitService.addEventListener('ready', function () {
		 TraerDatos();
		$scope.Reload = function () {
		    TraerDatos();
		 };
	   
	   $interval(function() { $scope.Reload(); }, 60000);
  });
  
}]);