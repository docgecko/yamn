'use strict';

/* Application - App unit test */

describe('Controller: AppCtrl', function () {

    // load the controller's module
    beforeEach(module('app', 'appServices'));

    var AppCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, titleService) {
        scope = $rootScope.$new();
        AppCtrl = $controller('AppCtrl', {
            $scope: scope
        });
    }));
});
