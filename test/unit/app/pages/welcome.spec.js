'use strict';

/* Pages - Welcome unit test */

describe('Controller: WelcomeCtrl', function () {

    // load the controller's module
    beforeEach(module('app', 'welcome', 'appServices'));

    var WelcomeCtrl,
        scope,
        pageTitle,
        pageTitleSuffix;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, titleService) {
        scope = $rootScope.$new();
        WelcomeCtrl = $controller('WelcomeCtrl', {
            $scope: scope
        });
        pageTitle = titleService.getTitle();
        pageTitleSuffix = titleService.getSuffix();
    }));

    it('should attach a list of awesomeThings to the scope', function () {
        expect(scope.awesomeThings.length).toBe(3);
    });

    it('should have a page title', function () {
        expect(pageTitle).toContain('Welcome');
        expect(pageTitleSuffix).toContain('yamn');
    });
});
