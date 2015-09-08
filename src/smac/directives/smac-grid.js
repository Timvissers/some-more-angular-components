angular.module('smac-grid', [])
    .run(function ($templateCache){
        $templateCache.put('smac-grid.html',
            '<div>\n' +
            '    <div ng-repeat="field in fields track by $index">{{field | uppercase}}</div>\n' +
            '    </div>\n' +
            '    <div ng-repeat="item in list track by $index">\n' +
            '        <div ng-repeat="field in fields track by $index">\n' +
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
