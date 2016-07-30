
/*jslint browser: true*/
/*global console, GardenLink*/

GardenLink.angular.controller('LogoutController', ['$auth', '$location',
function ($auth, $location) {
  'use strict';
  
     $auth.logout()
        .then(function() {
            // Desconectamos al usuario y lo redirijimos
            $location.path("/")
        });
}]);