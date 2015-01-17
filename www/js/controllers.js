angular.module('starter.controllers', ['ui.router'])

.controller('FormCtrl', function($scope, $http, $state) {
  $scope.airport = 'DTW';
  $scope.price = 300;
  // $scope.startDate = '2015-02-01';
  // $scope.endDate = "2015-02-10";
  $scope.submit = function(){
    $scope.results = [];
    $http.get('http://tripmeflights.herokuapp.com/search').then(function (resp){
      console.log('Success', resp);
      $state.go('tab.search', {results : JSON.stringify(resp.data)});
    }, function(err){
      console.log('ERR', err);
    })
  }
})

.controller('SearchCtrl', function($scope,$state,$stateParams) {
  $scope.results = JSON.parse($stateParams.results);
  //$scope.results = ["1","22",", "]
})

