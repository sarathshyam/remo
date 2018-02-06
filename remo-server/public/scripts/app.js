var remoApp = angular.module('remoApp', ['ngMessages', 'ngResource', 'ngRoute']);

//Routes
remoApp.config(function($routeProvider, $locationProvider){
    $locationProvider.hashPrefix('');
    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'mainController'
        })
        .when("/settings", {
            templateUrl: 'pages/forecast.html',
            controller: 'forecastController'
        })
});

//Services
remoApp.service('shareDataService', function(){
    this.city = 'Trivandrum, TRV';

    this.weatherResult = [{'temp':'20',
                            'dt': 1},
                        {'temp': '30',
                            'dt': 2}];
});

//Controllers
remoApp.controller('mainController', ["$scope", "$log", "$timeout", "$filter", "$http", "$location", "shareDataService",
    function ($scope, $log, $timeout, $filter,$http, $location, shareDataService) {
    

        var socket = io();
        $scope.$watch('metric', function(){
            console.log('Metric changed');            
        });
        $scope.max;
        $scope.min;
        socket.on('broadcast',function(metric) {
            console.log(metric);
            $scope.$apply(function(){
                $scope.metric = metric;
                if($scope.max === undefined || $scope.max < metric.value){
                    $scope.max = metric.value;
                }
                if($scope.min === undefined || $scope.min > metric.value){
                    $scope.min = metric.value;
                }
            });
        });
}]);

remoApp.controller('forecastController', ["$scope", "$log", "$timeout", "$filter", "$http", "$location", "$routeParams", "shareDataService",
function ($scope, $log, $timeout, $filter,$http, $location, $routeParams, shareDataService) {

    $scope.city = shareDataService.city;

    $scope.weatherResult = shareDataService.weatherResult;

    $scope.days = $routeParams.days || 2;

}]);


remoApp.directive('weatherReport', function(){
    return{
        restrict: 'AECM',
        templateUrl: 'directives/weatherreport.html',
        replace: true,
        scope: {
            weatherDay : "="
        }
    }
});
