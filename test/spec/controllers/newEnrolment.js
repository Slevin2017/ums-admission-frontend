'use strict';

describe('Controller: NewenrolmentCtrl', function () {

  // load the controller's module
  beforeEach(module('admissionSystemApp'));

  var NewenrolmentCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewenrolmentCtrl = $controller('NewenrolmentCtrl', {
      $scope: scope
    });
  }));

  xit('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
