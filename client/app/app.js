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
