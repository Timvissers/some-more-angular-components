'use strict';

angular.module('helloWorld', []) //TODO should not be another module
    .directive('helloWorld',function(){
      return{
        restrict: 'E',
        replace: true,
        template: '<p>Hello World</p>'
      }
    });