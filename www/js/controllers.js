angular.module('starter.controllers', ['ionic', 'ui.router'])


.directive('dragBack', function($ionicGesture, $state) {
  return {
    restrict : 'EAC',
    link : function(scope, elem, attr) {
      
      console.log("Dragback Link");
      
      $ionicGesture.on('swiperight', function(event) {
      
        console.log('Got swiped!');
        event.preventDefault();
        window.history.back();
        
      }, elem);
      
    }
  }  
})

.controller('FormCtrl', function($scope, $http, $state,$ionicViewSwitcher, $ionicLoading, $filter) {
  $scope.error = "";
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
    if(this.startDate && this.endDate){
      $scope.url = 'http://tripmeflights.herokuapp.com/search?airport=' + this.airport + '&price=' + this.price + '&startDate=' + this.startDate + '&endDate=' + this.endDate;
      $http.get($scope.url)
      .then(function (resp){
        console.log('Success', resp);
        $ionicLoading.hide();
        $ionicViewSwitcher.nextDirection('forward');
        $state.go('tab.search', {results : JSON.stringify(resp.data)});
      }, function(err){
        $ionicLoading.hide();
        $scope.error = "Sorry, there was an error with your search. Please try again!";
        console.log('ERR', err);
      })
    }
    else{
      $ionicLoading.hide();
      $scope.error = "Please enter a valid date";
    }
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
