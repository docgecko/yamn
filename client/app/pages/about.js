'use strict';

angular.module('about', ['ui.compat'])

    .config(['$stateProvider', '$routeProvider', '$urlRouterProvider', '$locationProvider',
        function ($stateProvider, $routeProvider, $urlRouterProvider, $locationProvider) {

            var about = {
                name: 'about',
                url: '/about',
                views: {
                    'header': {
                        templateUrl: 'app/header.html'
                    },
                    'content': {
                        templateUrl: 'app/pages/about.tpl.jade',
                        controller: 'AboutCtrl'
                    },
                    'footer': {
                        templateUrl: 'app/footer.html'
                    }
                }
            };

            $stateProvider
                .state(about);

            $locationProvider.html5Mode(true);
        }
    ])

    .controller('AboutCtrl', ['$scope', function ($scope) {
        $scope.title = 'About Us page';
        console.log($scope.title);
    }]);