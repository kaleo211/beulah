var app = angular.module('app', [
  'md.data.table',
  'ngRoute',
  'ngMaterial',
  'ngMessages',
  'transaction',
  'summary'
]);

app.controller('AppCtrl', function($scope, $mdDialog) {
  angular.element(document).ready(function () {
  });

  $scope.show = function(ev) {
    $mdDialog.show({
      contentElement: '#newTransactionDialog',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      fullscreen: true
    });
  };

  $scope.cancel = function() {
    $mdDialog.cancel();
  };
});

app.config(function ($routeProvider, $locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

  $routeProvider.otherwise({redirectTo: '/'});
});
