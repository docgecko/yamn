'use strict';

/* Application - app module */

angular.module('app', [
        'ui.compat',
        'about',
        'appServices'
    ])

    .config(['$stateProvider', '$routeProvider', '$urlRouterProvider', '$locationProvider',
        function ($stateProvider, $routeProvider, $urlRouterProvider, $locationProvider) {

            var home = {
                name: 'home',
                url: '/',
                views: {
                    'header': {
                        templateUrl: 'app/header.html'
                    },
                    'content': {
                        templateUrl: 'app/index.html',
                        controller: 'AppCtrl'
                    },
                    'footer': {
                        templateUrl: 'app/footer.html'
                    }
                }
            };

            $stateProvider
                .state(home);

            $locationProvider.html5Mode(true);
        }
    ])

    .run(function run (titleService) {
        titleService.setSuffix(' | yamn');
    })

    .controller('AppCtrl', function ($scope, titleService) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        var pageTitle = 'Welcome'
        titleService.setTitle(pageTitle);
    });
