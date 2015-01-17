angular.module('starter.controllers', ['ionic', 'ui.router'])

.controller('FormCtrl', function($scope, $http, $state,$ionicViewSwitcher, $ionicLoading, $filter) {
  $scope.airport = 'DTW';
  $scope.price = 300;
  $scope.submit = function(){
       $ionicLoading.show({
          content: 'Loading',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0
        });
    $scope.results = [];
    this.startDate = $filter('date')(this.startDate,'yyyy-MM-dd');
    this.endDate = $filter('date')(this.startDate,'yyyy-MM-dd');
    $scope.url = 'http://tripmeflights.herokuapp.com/search?airport=' + this.airport + '&price=' + this.price + '&startDate=' + this.startDate + '&endDate=' + this.endDate;
    $http.get($scope.url)
    .then(function (resp){
      console.log('Success', resp);
      $ionicLoading.hide();
      $ionicViewSwitcher.nextDirection('forward');
      $state.go('tab.search', {results : JSON.stringify(resp.data)});
    }, function(err){
      console.log('ERR', err);
    })
  }
})

.controller('SearchCtrl', function($scope,$state,$stateParams,$ionicViewSwitcher) {
  $scope.results = JSON.parse($stateParams.results);
  //$scope.results = ["1","22",", "]
  $scope.goBack = function() {
    $ionicViewSwitcher.nextDirection('back');
    $state.go('tab.form');
  }

  $scope.openLink = function(url){
    window.open(url, '_blank', 'location=yes');
  }
})
