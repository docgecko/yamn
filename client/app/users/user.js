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
                        controller: 'UsersListCtrl'
                    }
                }
            };

            var usersEdit = {
                name: 'users.edit',
                url: '/users/:id/edit',
                views: {
                    'header': {
                        templateUrl: 'templates/shared/header.html'
                    },
                    'content': {
                        templateUrl: 'templates/users/edit.html',
                        controller: 'UserEditCtrl'
                    }
                }
            };

            $stateProvider
                .state(users)
                .state(usersEdit);

            $locationProvider.html5Mode(true);
        }
    ])

    .controller('UsersListCtrl', ['$scope', '$http', 'titleService', function ($scope, $http, titleService) {
        var pageTitle = 'Users';
        titleService.setTitle(pageTitle);
    }])

    .controller('UsersEditCtrl', ['$scope', '$http', 'titleService', function ($scope, $http, titleService) {
        var pageTitle = 'Your user settings';
        titleService.setTitle(pageTitle);
    }]);