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
                        controller: 'UserListCtrl'
                    }
                }
            };

            $stateProvider
                .state(users);

            $locationProvider.html5Mode(true);
        }
    ])

    .controller('UserListCtrl', ['$scope', '$http', 'titleService', function ($scope, $http, titleService) {
        $http.get('/api/users').
            success(function(data, status, headers, config) {
                if(data.success){
                    $scope.users = data.users;
                }
            });
        var pageTitle = 'Users';
        titleService.setTitle(pageTitle);
    }]);