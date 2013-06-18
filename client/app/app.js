'use strict';

angular.module('app', ['ui.compat', 'about'])

    .config(['$stateProvider', '$routeProvider', '$urlRouterProvider', '$locationProvider',
        function ($stateProvider, $routeProvider, $urlRouterProvider, $locationProvider) {

            var home = {
                name: 'home',
                url: '/',
                template: 'app/home/index.html',
                controller: 'AppCtrl'
            };

            $stateProvider
                .state(home);

            $locationProvider.html5Mode(true);
        }
    ])

    .controller('AppCtrl', ['$scope', function ($scope) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
    }]);
