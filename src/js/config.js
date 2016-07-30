/*jslint browser: true*/
/*global console, GardenLink, angular, Framework7*/

// Init angular
var GardenLink = {};

GardenLink.config = {
    
};

GardenLink.angular = angular.module('GardenLink',["satellizer"]);

//config auth
GardenLink.angular.config(function($authProvider) {
      // Parametros de configuración
      $authProvider.loginUrl = "http://gardenlink.cl:9000/login";
      $authProvider.signupUrl = "http://api.com/auth/signup";
      $authProvider.tokenName = "3100679128-L7Ci3ZmSFbcJXcqeZQfOludnLR8hTThdvw0G89F";
      $authProvider.tokenPrefix = "myApp";
});

GardenLink.fw7 = {
  app : new Framework7({
    animateNavBackIcon: true
  }),
  options : {
    dynamicNavbar: true,
    domCache: true
  },
  views : []
};