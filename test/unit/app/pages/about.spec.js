'use strict';

describe('Controller: AboutCtrl', function () {

    // load the controller's module
    beforeEach(module('about', 'app'));

    var AboutCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        AboutCtrl = $controller('AboutCtrl', {
            $scope: scope
        });
    }));

    it('should see reference to about us page', function () {
        var content = "About Us page";
        expect(content).toBe("About Us page");
    });
});
