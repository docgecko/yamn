'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Visit the Home Page', function () {

    beforeEach(function () {
        browser().navigateTo('../../app/index.html');
    });

    it('should see the root page', function() {
        expect(browser().location().url()).toBe("");
    });

});