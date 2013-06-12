'use strict';

angular.module('app', [])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'index.tpl.html',
                controller: 'AppCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
        $locationProvider.html5Mode(true);
    });
