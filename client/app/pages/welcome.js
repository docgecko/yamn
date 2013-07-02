'use strict';

/* Pages - Welcome module */

angular.module('welcome', [
        'ui.compat',
        'appServices'
    ])

    .config(['$stateProvider', '$routeProvider', '$urlRouterProvider', '$locationProvider',
        function ($stateProvider, $routeProvider, $urlRouterProvider, $locationProvider) {

            var welcome = {
                name: 'welcome',
                url: '/',
                views: {
                    'header': {
                        templateUrl: 'templates/shared/header.html'
                    },
                    'content': {
                        templateUrl: 'templates/pages/welcome.html',
                        controller: 'WelcomeCtrl'
                    }
                }
            };

            $stateProvider
                .state(welcome);

            $locationProvider.html5Mode(true);
        }
    ])

    .controller('WelcomeCtrl', ['$scope', 'titleService', function ($scope, titleService) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        var pageTitle = 'Welcome';
        titleService.setTitle(pageTitle);
    }]);