'use strict';

/* Application - app module */

angular.module('app', [
        'ui.compat',
        'about',
        'users',
        'appServices'
    ])

    .config(['$stateProvider', '$routeProvider', '$urlRouterProvider', '$locationProvider',
        function ($stateProvider, $routeProvider, $urlRouterProvider, $locationProvider) {

            var home = {
                name: 'home',
                url: '/',
                views: {
                    'header': {
                        templateUrl: 'templates/shared/header.html'
                    },
                    'content': {
                        templateUrl: 'templates/index.html',
                        controller: 'AppCtrl'
                    }
                }
            };

            $stateProvider
                .state(home);

            $locationProvider.html5Mode(true);
        }
    ])

    .run(['titleService', function (titleService) {
        titleService.setSuffix(' | yamn');
    }])

    .controller('AppCtrl', ['$scope', 'titleService', function ($scope, titleService) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        var pageTitle = 'Welcome';
        titleService.setTitle(pageTitle);
    }]);
