'use strict';

/* Pages - About module */

angular.module('about', [
        'ui.compat',
        'appServices'
    ])

    .config(['$stateProvider', '$routeProvider', '$urlRouterProvider', '$locationProvider',
        function ($stateProvider, $routeProvider, $urlRouterProvider, $locationProvider) {

            var about = {
                name: 'about',
                url: '/about',
                views: {
                    'header': {
                        templateUrl: 'templates/shared/header.html'
                    },
                    'content': {
                        templateUrl: 'templates/pages/about.html',
                        controller: 'AboutCtrl'
                    }
                }
            };

            $stateProvider
                .state(about);

            $locationProvider.html5Mode(true);
        }
    ])

    .controller('AboutCtrl', ['$scope', 'titleService', function ($scope, titleService) {
        var pageTitle = 'About Us';
        titleService.setTitle(pageTitle);
    }]);