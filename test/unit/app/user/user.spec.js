'use strict';

/* User - List unit test */

describe('Controller: UsersListCtrl', function () {

    // load the controller's module
    beforeEach(module('app', 'users', 'appServices'));

    var UsersListCtrl,
        scope,
        pageTitle,
        pageTitleSuffix;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, titleService) {
        scope = $rootScope.$new();
        UsersListCtrl = $controller('UsersListCtrl', {
            $scope: scope
        });
        pageTitle = titleService.getTitle();
        pageTitleSuffix = titleService.getSuffix();
    }));

    it('should have a page title', function () {
        expect(pageTitle).toContain('Users');
        expect(pageTitleSuffix).toContain('yamn');
    });
});

/* User - Edit unit test */

describe('Controller: UsersEditCtrl', function () {

    // load the controller's module
    beforeEach(module('app', 'users', 'appServices'));

    var UsersEditCtrl,
        scope,
        pageTitle,
        pageTitleSuffix;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, titleService) {
        scope = $rootScope.$new();
        UsersEditCtrl = $controller('UsersEditCtrl', {
            $scope: scope
        });
        pageTitle = titleService.getTitle();
        pageTitleSuffix = titleService.getSuffix();
    }));

    it('should have a page title', function () {
        expect(pageTitle).toContain('Your user settings');
        expect(pageTitleSuffix).toContain('yamn');
    });
});
