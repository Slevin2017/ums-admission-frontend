angular.module('admissionSystemApp')
  .controller('ProgressBarCtrl', ['$scope', 'progressBarService', function ($scope, progressBarService) {


    $scope.status = "Заповнено на: ";

    $scope.value = progressBarService;

    $scope.$watch('value.value', function (value) {

      $scope.progressBarPercent = Math.round((value * 100) / progressBarService.inputQuantity);

      var type;
      if ($scope.progressBarPercent < 25) {
        type = 'danger';
      } else if ($scope.progressBarPercent < 50) {
        type = 'warning';
      } else if ($scope.progressBarPercent < 99) {
        type = 'info';
      } else {
        type = 'success';
      }
      $scope.type = type;

      if ($scope.dynamic === 100) {
        $scope.propositionAll = "Будь ласка, додайте предмети та пiльги!";
      } else {
        $scope.propositionAll = " ";

      }


    });

  }]);

