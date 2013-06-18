'use strict';

angular.module('welcome', ['ui.state'])

    .config(['$stateProvider', '$routeProvider', function ($stateProvider, $routeProvider) {
        $stateProvider
            .state('index', {
                url: "", // root route
                views: {
                    templateUrl: 'app/welcome/index.html'
                },
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