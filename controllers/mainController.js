let app = angular.module('miApp', ['ngRoute']);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/home.html',
    })
    .when('/libro/:id', {
      templateUrl: 'views/libro.html',
      controller: 'librosController'
    })
    .otherwise({
      templateUrl: 'views/error.html',
    })
})

app.controller('mainController', function ($scope, $http) {
    let url = 'data/books.json'
    $http.get(url)
      .then(function (response) {
        $scope.libros = response.data;
      })
      .catch(function (error) {
        console.log(error);
      })
    $scope.redireccionar = function (libroId) {
      if (libroId == undefined) {
        let aleatorio = Math.floor(Math.random() * $scope.libros.length);
        let url = '#libro/' + (aleatorio + 1);
        window.location.href = url;
      } else {
        var url = '#libro/' + libroId;
        window.location.href = url;
      }
    }
  });
  

app.controller('librosController', function ($scope, $http, $routeParams) {

  let url = 'data/books.json'
    $http.get(url)
      .then(function (response) {
        $scope.libro = response.data[$routeParams.id - 1];
      })
      .catch(function (error) {
        console.log(error);
      })
})
