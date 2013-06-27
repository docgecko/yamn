'use strict';

/* Application - App unit test */

describe('Service: appServices', function () {

    // load the service's module
    beforeEach(module('appServices'));

    var sSuffix,
        gSuffix,
        sTitle,
        gTitle,
        s = 'yamn',
        t = 'Test Page';

    // instantiate service
    beforeEach(inject(function ($rootScope, sSuffix, gSuffix, sTitle, gTitle) {
        scope = $rootScope.$new();
        sSuffix = titleService.setSuffix(s);
        gSuffix = titleService.getSuffix();
        sTitle = titleService.setTitle(t);
        gTitle = titleService.getTitle();
    }));

    it('should set the title', function () {
        expect(gSuffix).toBe('Test Page | yamn');
    });
});