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
        $scope.getHeader = function () {
            return 'app/header.html';
        };
        $scope.getFooter = function () {
            return 'app/footer.html';
        };
    }]);
