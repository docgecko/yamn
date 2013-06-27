'use strict';

/* Common - Services unit test */

describe('Service: appServices', function () {

    // load the service's module
    beforeEach(module('appServices'));

    var setSuffix,
        getSuffix,
        setTitle,
        getTitle,
        s,
        t;

    // instantiate service
    beforeEach(inject(function (titleService) {
        setSuffix = titleService.setSuffix(' | yamn');
        getSuffix = titleService.getSuffix();
        setTitle = titleService.setTitle('Test Page');
        getTitle = titleService.getTitle();
    }));

    it('should set the title', function () {
        expect(getTitle).toBe('Test Page | yamn');
    });
});