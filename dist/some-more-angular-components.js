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
angular.module('smac.services', ['smac-fetch']);
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
                list: '@',
                fields: '@'
            },
            templateUrl: 'smac-grid.html'
        };
    });

angular.module('smac-fetch', [])
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
        this.$get = function($rootScope){
            self.rootScope = $rootScope;
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