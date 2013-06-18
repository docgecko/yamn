'use strict';

angular.module('about', ['ui.compat'])

    .config(['$stateProvider', '$routeProvider', '$urlRouterProvider', '$locationProvider',
        function ($stateProvider, $routeProvider, $urlRouterProvider, $locationProvider) {

            var home = {
                name: 'about',
                url: '/about',
                abstract: true,
                template: 'app/about/index.html',
                controller: 'AboutCtrl'
            };

            $stateProvider
                .state(home);

            $locationProvider.html5Mode(true);
        }
    ])

    .controller('AboutCtrl', ['$scope', function () {
        console.log('About loaded');
    }]);