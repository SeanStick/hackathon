angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('menu.main', {
    url: '/main',
    views: {
      'side-menu21': {
        templateUrl: 'templates/main.html',
        controller: 'mainCtrl'
      }
    }
  })

  .state('menu.logIn', {
    url: '/login',
    views: {
      'side-menu21': {
        templateUrl: 'templates/logIn.html',
        controller: 'logInCtrl'
      }
    }
  })

  .state('menu.cloud', {
    url: '/cloud',
    views: {
      'side-menu21': {
        templateUrl: 'templates/cloud.html',
        controller: 'cloudCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    abstract:true
  })

$urlRouterProvider.otherwise('/side-menu21/main')

  

});