'use strict';
// Declare app level module which depends on views, and components
angular.module('CV', ['ngRoute','CV.projectExps','factories','ngAnimate'])
.config( function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider
  .when('/skills', {
    templateUrl: 'partials/skills.html',
    controller: 'skillsCtrl as ctrl',
    reloadOnSearch: false,
  })
  .when('/skills/:param', {
    templateUrl: 'partials/skills.html',
    controller: 'skillsCtrl as ctrl',
    reloadOnSearch: false,
  })
  .when('/training', {
    templateUrl: 'partials/training.html',
    controller: 'displayCtrl as ctrl'
  })
  .when('/about', {
    templateUrl: 'partials/about.html',
  })
  .otherwise({redirectTo: 'about'});
})

.controller('displayCtrl',['$scope','CvService',function($scope,CvService) {
  //functions
  $scope.getCVJson = function() {
    CvService.getCV().then(function (res) { // contain all our infos
      $scope.cv = res;
      $scope.$apply();
    })
    .catch(function (err) {
      Materialize.toast("Error occured while getting cv_weisser.json ", 1000, "red");
    })
  };
  //init
  $scope.getCVJson();
}])
.controller('skillsCtrl',['$routeParams','$timeout','$scope','CvService',function($routeParams,$timeout,$scope,CvService) {

  //functions
  $scope.getCVJson = function() {
    CvService.getCV().then(function (res) { // contain all our infos
      $scope.cv = res;
      $scope.$apply();
    })
    .catch(function () {
      Materialize.toast("Error occured while getting cv_weisser.json", 1000, "red");
    })
  };

  $scope.detail = function(skillId) {
      $( "#"+skillId ).toggleClass("skill-item-more stretchRightNoBounce");
      $( "#"+skillId ).parent().toggleClass("skill-item-text-more");
  }

  $scope.expandAll = function(id){
    $timeout(function (){
      $("#"+id +" > .skill-group").children().each(function(){
      this.click();
      });
    });
  }
  //init
/* won't work because wtf can't find an lement when it's not loaded even with timeout fml
  var orClassSize;
  $timeout(function (){
    orClassSize = [$('.class-item-text').outerWidth(),$('.class-item-text').outerHeight()];
    $('.class-item-text').hover(function(event){
        $(this).stop().animate({
            height: event.type === "mouseenter" ? (orClassSize[1] + 10)+"px" : orClassSize[1],
            width: event.type === "mouseenter" ? (orClassSize[0] + 10)+"px" : orClassSize[0]}, 30,
        function() {
        // Animation complete.
      });
    });
  });
*/
  $scope.getCVJson();


/*  $scope.$on('$viewContentLoaded', function(){
    $(".dropdown-content").children().sort(sortByFam);
  });*/
}])
