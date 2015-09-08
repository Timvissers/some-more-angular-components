'use strict';

angular.module('smac-error-handler', [])
  .factory('SMACErrorHandler', ['$rootScope', '$window', function($rootScope, $window){
    var errorHandler = {
      getError: function(){
        return $rootScope.errorMessage;
      },
      setError : function(newErrorMessage){
        $rootScope.errorMessage = newErrorMessage;
      },
      resetError : function(){
        $rootScope.errorMessage = '';
      }
    };

    $rootScope.$on('$viewContentLoaded', errorHandler.resetError);

    $rootScope.$watch('errorMessage', function(){
      if($rootScope.errorMessage) {
        $window.alert($rootScope.errorMessage);
      }
    });

    return errorHandler;
  }]);
