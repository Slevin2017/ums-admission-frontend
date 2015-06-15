'use strict';

angular.module('admissionSystemApp')
  .controller('TabPersonCtrl', ['$scope', 'DictionariesSvc', '$q', '$filter', 'progressBarService', function ($scope, DictionariesSvc, $q, $filter, progressBarService) {

    $q.all([
      DictionariesSvc.getPersonsTypes(),
      DictionariesSvc.getGenderTypes(),
      DictionariesSvc.getMarriedTypes(),
      DictionariesSvc.getAdminUnitsTypes(),
      DictionariesSvc.getAdminUnits({
        adminUnitTypeId: 6
      })
    ])
      .then(function (promisesResult) {
        $scope.personsTypes = promisesResult[0];
        $scope.entirePerson.person.personTypeId = promisesResult[0][0].id;
        $scope.genderTypes = promisesResult[1];
        $scope.marriedTypes = promisesResult[2];
        $scope.adminUnitsTypes = promisesResult[3];
        $scope.adminUnits = promisesResult[4];
      });


    $scope.entirePerson.person.begDate = $filter('date')($scope.entirePerson.person.begDate, 'yyyy-MM-dd');

    progressBarService.reset();
    $scope.$on('valBubble', function (evt, args) {
      progressBarService.setValidity(args.name, args.isValid);
    });

  }]);
