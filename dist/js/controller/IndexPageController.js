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
  		  	DataService.relayClicked($scope.relays[key]);
  		  }
		});
  	}
  	
  }
  
  
  
  
   
   var $$ = Dom7;
   
  
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
  
  InitService.addEventListener('ready', function () {
  		GardenLink.fw7.app.showPreloader();
		 TraerDatos();
		$scope.Reload = function () {
			GardenLink.fw7.app.showPreloader();
		    TraerDatos();
		 };
		 
		 //GardenLink.fw7.app.loginScreen();
		 /*
		GardenLink.fw7.app.modalLogin('Autenticacion', function (username, password) {
        		GardenLink.fw7.app.alert('Thank you! Username: ' + username + ', Password: ' + password);
    	});
    	*/
	   
	   $interval(function() { $scope.Reload(); }, 60000);
  });
  
}]);