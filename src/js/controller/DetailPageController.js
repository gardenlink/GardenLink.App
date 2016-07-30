/*jslint browser: true*/
/*global console, GardenLink*/

GardenLink.angular.controller('DetailPageController', ['$scope', '$http', 'InitService', 'DataService',
	function ($scope, $http, InitService, DataService) {
  		'use strict';
  		
  		DataService.addEventListener('dispositivoClicked', function (dispositivo) {
  			$scope.dispositivo = dispositivo;
  		});
  		
   var $$ = Dom7;
   
  

  
  
		function BuscarRelayByDevice(idDispositivo) {
			  var returnValue;
			  angular.forEach($scope.relays, function(value, key) {
		  
	  		  if (value.IdDispositivo == idDispositivo) {
	  		  	returnValue = value;
	  		  }
			});
			return returnValue;
		}
		
	
		function BuscarMotorById(idMotor) {
			  var returnValue;
			  angular.forEach($scope.motores, function(value, key) {
		  
	  		  if (value.IdMotor == idMotor) {
	  		  	returnValue = value;
	  		  }
			});
			return returnValue;
		}
	
 $scope.onMotorChanged = function(id,posicion) {
	console.log("ID : " + id);
	console.log("POS : " + posicion);
 }
 
 	$scope.onTouchmove = function($event) {
	   console.log('touchmove event called');
	}

  $scope.onItemClicked = function(objeto) {
  
  	if (objeto.IdMotor) {
  		console.log("culito");
  	}
  	
  	if (objeto.IdRelay) {
  		
  		
  		angular.forEach($scope.relays, function(value, key) {
		  
  		  if (value.IdRelay == objeto.IdRelay) {
  		  	$scope.relays[key].Activo = !$scope.relays[key].Activo;
  		  	DataService.relayClicked($scope.relays[key]);
  		  }
		}); 
	}
  
	}
	
	function TraerDatos(opt){
  	   
  	   	
  	   
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
		   	GardenLink.fw7.app.hidePreloader();
		   });
	   }
  };
  
	
  DataService.addEventListener('relayClicked', function (relay) {
  			GardenLink.fw7.app.showPreloader();
  			DataService.putDataRelay(relay, function(error, data) {
  				if (relay.Activo != data.Activo) {
	  				var opt = { Relay : true };
	  				TraerDatos(opt);
  				}
  				else{
	  				GardenLink.fw7.app.hidePreloader();
  				}
  			});
  			
  		});
	}
	
]);