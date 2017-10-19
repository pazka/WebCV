angular.module('CV.projectExps',['CV','factories'])
.config(['$routeProvider', function( $routeProvider) {
    $routeProvider

    .when('/projects', {
    templateUrl: './partials/projects.html',
    controller: 'moreCtrl as ctrl',
    resolve :{pageDir : function(){return "none"}}
    })

    .when('/experiences', {
      templateUrl: './partials/experiences.html',
      controller: 'moreCtrl as ctrl',
      resolve :{pageDir : function(){return "none"}}
    })

    .when('/projects/:param', {
    templateUrl: './partials/more_expProj.html',
    controller: 'moreCtrl as ctrl',
    resolve :{pageDir : function(){return "./partials/projects/";}}
    })

    .when('/experiences/:param', {
      templateUrl: './partials/more_expProj.html',
      controller: 'moreCtrl as ctrl',
      resolve :{pageDir : function(){return "./partials/experiences/";}}
    })
}])
.controller('moreCtrl',['$scope','$routeParams','CvService','pageDir',function ($scope, $routeParams,CvService,pageDir ) {

    //functions
    $scope.getCV = function() {
      CvService.getCV()
      .then(function (res) {
          $scope.cv = res;
          $scope.$apply();
      })
      .catch(function () {
          Materialize.toast("Error occured while getting cv_weisser.json", 1000, "red");
      })
    };


    addOrRemove = false;
    $scope.detail = function(id) {
        $( "#"+id ).toggleClass("bigger");
        $( "#"+id ).toggleClass("stretchRightNoBounce", !addOrRemove );
        $( "#"+id ).toggleClass("stretchRightBoxReverse", addOrRemove );
        addOrRemove = !addOrRemove;
    }

    //init
      $scope.page = pageDir + $routeParams.param + ".html";
      $scope.getCV();
}]);
