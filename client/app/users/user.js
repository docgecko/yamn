'use strict';

/* Users - User module */

angular.module('users', [
        'ui.compat',
        'appServices'
    ])

    .config(['$stateProvider', '$routeProvider', '$urlRouterProvider', '$locationProvider',
        function ($stateProvider, $routeProvider, $urlRouterProvider, $locationProvider) {

            var users = {
                name: 'users',
                url: '/users',
                views: {
                    'header': {
                        templateUrl: 'templates/shared/header.html'
                    },
                    'content': {
                        templateUrl: 'templates/users/index.html',
                        controller: 'UserCtrl'
                    }
                }
            };

            $stateProvider
                .state(users);

            $locationProvider.html5Mode(true);
        }
    ])

    .controller('UserCtrl', ['$scope', 'titleService', function ($scope, titleService) {
        var pageTitle = 'Users';
        titleService.setTitle(pageTitle);
    }]);