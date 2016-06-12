/*jslint browser: true*/
/*global console, GardenLink, angular, Framework7*/

// Init angular
var GardenLink = {};

GardenLink.config = {
};

GardenLink.angular = angular.module('GardenLink', []);

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