'use strict';

/* Application - app module */

angular.module('app', [
        'ui.compat',
        'welcome',
        'about',
        'users',
        'appServices'
    ])

    .run(['titleService', function (titleService) {
        titleService.setSuffix(' | yamn');
    }])

    .controller('AppCtrl', ['$scope', 'titleService', function ($scope, titleService) {

    }]);
