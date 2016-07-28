angular.module('appName', ['dependencie1','dependencie2'])
//redirection by state
    .config(function ($urlRouterProvider, $stateProvider){
        // If no state correpond to what written after # in the url
        $stateProvider
            .state('/', {
                url: "/",
                templateUrl: "partials/home.html"
            })
            .state('skel', {
                url: "/details/:param1", // real url will be "adress/#/details/smthg"
                templateUrl: "partials/smthg.html",
                controller : 'controllerName as ctrl',
                resolve : { // inject data in controller
                    currentCity : function ($stateParams) {
                        return $stateParams.param1;
                    }
                }
            });
            $urlRouterProvider.otherwise('/');
    })

//CONTROLLER
    .controller('nameCtrl', function (WeatherService) {
        // data
        var data = {
            someData: 42,
        };

        // function
        function fc(id) {
            //TODO
        }

        //init
        someFct();

        //public interface
        angular.extend(this, { // to not have to write this everytime
            data: data,
        });
    })
    .filter('formatTemperature', [ // lil' function that will be executed to validate datas at the display
        function() {
            return function(value) {
                return (parseInt(value) - 273.15).toFixed(1) + " °C";
            };
        }
    ]);
