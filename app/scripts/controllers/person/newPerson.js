'use strict';

angular.module('admissionSystemApp')
  .controller('NewPersonCtrl', ['$scope', '$stateParams', 'Person', '$location',
    'DictionariesSvc', '$state', 'basePersonData',
    function ($scope, $stateParams, Person, $location, DictionariesSvc, $state, basePersonData) {

      $scope.entirePerson = {};
      $scope.entirePerson.person = {};
      $scope.entirePerson.names = [];
      $scope.entirePerson.contacts = [];
      $scope.entirePerson.papers = [];
      $scope.entirePerson.enrolmentsubjects = [];
      $scope.entirePerson.names[0] = {
        languageId: 2,
        fatherName: ''
      };
      $scope.entirePerson.addresses = {
        regAddresses: {
          addressTypeId: 1
        },
        postAddresses: {
          addressTypeId: 2
        },
        isAdressesMatch: true
      };

      $scope.brosweOrEditPerson = function (personId) {
        Person.getEntirePerson(personId).then(function (res) {
          _.merge($scope.entirePerson, res);
        });
      };

      if ($stateParams.id) {
        $scope.brosweOrEditPerson($stateParams.id);
      } else {
        Person.clearCopy();
      }

      $scope.deletePerson = function () {
        Person.deleteEntirePerson().then(function () {
          DictionariesSvc.clearStorageByRoute('persons');
          $state.go('root.person.list');
        });
      };

      $scope.sendToServerPerson = function (entirePerson) {
        $scope.entirePerson.names[0].name = $scope.entirePerson.names[0].surname +
        ' ' + $scope.entirePerson.names[0].firstName +
        ' ' + $scope.entirePerson.names[0].fatherName;
        $scope.entirePerson.person.name = $scope.entirePerson.person.surname +
        ' ' + $scope.entirePerson.person.firstName +
        ' ' + $scope.entirePerson.person.fatherName;

        if (!$scope.entirePerson.person.photo) {
          $scope.entirePerson.person.photo = '/';
        }
        $scope.entirePerson.person.isMilitary = ($scope.entirePerson.person.isMilitary) ? 1 : 0;
        $scope.entirePerson.person.isHostel = ($scope.entirePerson.person.isHostel) ? 1 : 0;
        $scope.entirePerson.person.resident = ($scope.entirePerson.person.resident) ? 1 : 0;
        Person.addOrEditPerson(entirePerson).then(function () {
          DictionariesSvc.clearStorageByRoute('persons');
          $state.go('root.person.list');
        });
      };

      $scope.personTabs = angular.copy(basePersonData.tabs);

      $scope.tabSubjDisabled = function () {
        return !$scope.entirePerson.papers.some(function (paper) {
          return paper.paperTypeId === 4;
        })
      };

      _.each($scope.personTabs, function (item) {
        item.active = $state.current.name === item.route.new || $state.current.name === item.route.edit;
      });

      $scope.go = function (route) {
        if ($stateParams.id) {
          $state.go(route.edit, {
            id: $stateParams.id
          });
        } else {
          $state.go(route.new);
        }
      };

      if ($state.is('root.person.new.main') || $state.is('root.person.edit.main')) {

      }

    }]);
