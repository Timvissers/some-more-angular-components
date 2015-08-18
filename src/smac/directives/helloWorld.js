'use strict';

angular.module('helloWorld', [])
    .directive('helloWorld',function(){
      return{
        restrict: 'E',
        replace: true,
        template: '<p>Hello World</p>'
      };
    });