'use strict';

angular.module('app', ['welcome'])

    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider
            .otherwise({
                redirectTo: '/'
            });
        $locationProvider.html5Mode(true);
    }])

    .controller('AppCtrl', ['$scope', function ($scope) {
        console.log($scope);
    }]);
