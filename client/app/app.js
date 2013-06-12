'use strict';

angular.module('app', ['welcome'])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .otherwise({
                redirectTo: '/welcome'
            });
        $locationProvider.html5Mode(true);
    });
