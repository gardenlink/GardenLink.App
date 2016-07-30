
/*jslint browser: true*/
/*global console, GardenLink*/

GardenLink.angular.controller('LoginController', ['$auth', '$location', '$scope',
function ($auth, $location, $scope) {
  'use strict';
  
    var vm = this;
    $scope.login = function(){
        console.log('llega login');
        $auth.login({
            email: vm.email,
            password: vm.password
        })
        .then(function(){
            // Si se ha logueado correctamente, lo tratamos aquí.
            // Podemos también redirigirle a una ruta
            console.log("fail");
            $location.path("/private")
        })
        .catch(function(response){
            // Si ha habido errores llegamos a esta parte
            console.log("error");
        });
    }
}]);