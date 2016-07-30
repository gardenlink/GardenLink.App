
/*jslint browser: true*/
/*global console, GardenLink*/

GardenLink.angular.controller('SignUpController', ['$auth', '$location',
function ($auth, $location) {
  'use strict';
  
   var vm = this;
    this.signup = function() {
        $auth.signup({
            email: vm.email,
            password: vm.password
        })
        .then(function() {
            // Si se ha registrado correctamente,
            // Podemos redirigirle a otra parte
            $location.path("/private");
        })
        .catch(function(response) {
            // Si ha habido errores, llegaremos a esta función
        });
    }
   
}]);