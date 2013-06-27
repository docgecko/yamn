'use strict';

/* Pages - About unit test */

describe('Controller: AboutCtrl', function () {

    // load the controller's module
    beforeEach(module('app', 'about', 'appServices'));

    var AboutCtrl,
        scope,
        pageTitle,
        pageTitleSuffix;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, titleService) {
        scope = $rootScope.$new();
        AboutCtrl = $controller('AboutCtrl', {
            $scope: scope
        });
        pageTitle = titleService.getTitle();
        pageTitleSuffix = titleService.getSuffix();
    }));

    it('should have a page title', function () {
        expect(pageTitle).toContain('About Us');
        expect(pageTitleSuffix).toContain('yamn');
    });
});
