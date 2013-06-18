'use strict';

angular.module('app', ['ui.state','welcome'])

    .config(['$stateProvider', '$routeProvider', '$locationProvider', function ($stateProvider, $routeProvider, $locationProvider) {
        $routeProvider
            .otherwise({
                redirectTo: '/'
            });
        $locationProvider.html5Mode(true);
    }])

    .controller('AppCtrl', ['$scope', function ($scope) {
        $scope.getHeader = function () {
            return 'app/header.html';
        };
        $scope.getFooter = function () {
            return 'app/footer.html';
        };
    }]);
