'use strict';

angular
  .module('admissionSystemApp')
  .factory('searchPersonSvc', ['Restangular', 'personDecodeSvc', 'DictionariesSvc',
    'translHttpStatusSvc',
    function (Restangular, personDecodeSvc, DictionariesSvc, translHttpStatusSvc) {

      var data = {
        searchResult : [],
        selectedPerson : []
      },
        params;

      function decodePersons (obj, persons) {
        personDecodeSvc.personDecoded(persons).then(function (personsDecoded) {
          data[obj].length = 0;
          _.merge(data[obj], personsDecoded);
        });
      }

      function getPersonsByParepId (papers) {
        var personsToDecode = [],
          ids = [];

        ids = _.pluck(papers, 'personId');
        _.forEach(ids, function (n) {
          Restangular.one('persons', n).get().then(function (singlePerson) {
            personsToDecode.push(singlePerson);
            decodePersons('searchResult', personsToDecode);
          }, translHttpStatusSvc.notifyAboutError);
        });
      }

      function searchPerson (query, prop, route) {

        if (prop === 'id') {
          Restangular.one('persons', query).get().then(function (singlePerson) {
            decodePersons('searchResult', [singlePerson]);
          }, translHttpStatusSvc.notifyAboutError);
          return;
        }

        params = {};
        params[prop] = query;

        DictionariesSvc.getAllItems(route, params, false).then(function (rawData) {
          if (route !== 'persons') {
            getPersonsByParepId(rawData);
          } else {
            decodePersons('searchResult', rawData);
          }
        });
      }

      function getSinglePerson (id) {
        Restangular.one('persons', id).get().then(function (singlePerson) {
          decodePersons('selectedPerson', [singlePerson]);
        }, translHttpStatusSvc.notifyAboutError);
      }

      return {
        searchPersons: searchPerson,
        parseSinglePersons: getSinglePerson,
        searchResult: data.searchResult,
        selectedPerson: data.selectedPerson
      };
    }]);
