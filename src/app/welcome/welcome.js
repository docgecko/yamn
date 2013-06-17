'use strict';

angular.module('welcome', [])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'src/app/welcome/index.html',
                controller: 'WelcomeCtrl'
            });
    }])

    .controller('WelcomeCtrl', ['$scope', function ($scope) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
    }]);