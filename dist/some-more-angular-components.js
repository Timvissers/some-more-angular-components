'use strict';

(function() {


// Create all modules and define dependencies to make sure they exist
// and are loaded in the correct order to satisfy dependency injection
// before all nested files are concatenated by Gulp

// Config
angular.module('smac.config', [])
    .value('smac.config', {
        debug: true
    });

// Modules
angular.module('smac.directives', ['smac-grid']);
angular.module('smac.filters', []);
angular.module('smac.services', ['smac-error-handler', 'smac-fetch']);
angular.module('smac',
    [
        'smac.config',
        'smac.directives',
        'smac.filters',
        'smac.services'
    ]);

angular.module('smac-grid', [])
    .run(function ($templateCache){
        $templateCache.put('smac-grid.html',
            '<div>\n' +
            '    <div ng-repeat="field in fields">{{field | uppercase}}</div>\n' +
            '    </div>\n' +
            '    <div ng-repeat="item in list">\n' +
            '        <div ng-repeat="field in fields">\n' +
            '        <div>{{item[field]}}</div>\n' +
            '    </div>\n' +
            '</div>\n'
        );
    })
    .directive('smacGrid', function(){
        return {
            restrict: 'E',
            scope: {
                list: '=',
                fields: '='
            },
            templateUrl: 'smac-grid.html'
        };
    });

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

'use strict';

angular.module('smac-fetch', ['smac-error-handler'])
  .provider('SMACJsonFetcher', function(){
    var defaultJsonHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    var self = this;

    function SMACJsonFetcher(){
      this.all = function(location){
        return new SMACList(location);
      };
      this.one = function(location, id){
        return new SMACOne(location, id);
      };
    }
    this.$get = function($rootScope, SMACErrorHandler){
      self.rootScope = $rootScope;
      self.errorHandler = SMACErrorHandler;
      return new SMACJsonFetcher();
    };

    function SMACList(location){
      this.location = location;
      this.getList = function(callback){
        fetch(location).then(function(list){
          return list.json();
        }).then(function(json){
          self.rootScope.$apply(function(){
            callback(json);
          });
        }).catch(function(error){
          self.rootScope.$apply(function() {
            console.error(error);
            self.errorHandler.setError('Unexpected error while fetching ' + location);
          });
        });
      };
      this.addOne = function(one){
        fetch(location, {
          method: 'post',
          body: JSON.stringify(one),
          headers: defaultJsonHeaders
        });
      };
    }
    function SMACOne(location, id){
      this.location = location;
      this.id = id;
      this.getOne = function(callback){
        fetch(location).then(function(result){
          return result.json();
        }).then(function(result){
          self.rootScope.$apply(function(){
            callback(result);
          });
        }).catch(function(error){
          self.rootScope.$apply(function() {
            console.error(error);
            self.errorHandler.setError('Unexpected error while fetching ' + location + '/' + this.id);
          });
        });
      };
      this.putOne = function(one){
        fetch(location + '/' + id, {
          method: 'put',
          body: one,
          headers: defaultJsonHeaders
        });
      } ;
      this.deleteOne = function(){
        fetch(location + '/' + id, {
          method: 'delete'
        });
      };
    }
  });

}());