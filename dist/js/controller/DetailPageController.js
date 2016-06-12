/*jslint browser: true*/
/*global console, GardenLink*/

GardenLink.angular.controller('DetailPageController', ['$scope', '$http', 'InitService', 'DataService',
	function ($scope, $http, InitService, DataService) {
  		'use strict';
  		
  		DataService.addEventListener('dispositivoClicked', function (dispositivo) {
  			$scope.dispositivo = dispositivo;
  		});

  
	}
]);