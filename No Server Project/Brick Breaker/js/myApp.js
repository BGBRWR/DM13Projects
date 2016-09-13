angular.module('myApp',['ui.router'])
.config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home',{
                url:'/',
                templateUrl: "./views/home.html",
                controller: 'homeCtrl',
            })
            .state('game', {
              url: '/game',
              templateUrl: "./views/game.html",
              controller: 'gameCtrl'
            })
            .state('hacker', {
              url: '/hacker',
              templateUrl: "./views/hackerMain.html",
              controller: 'hackerCtrl',
              onExit: function (govService) {
                govService.audio.pause();
              }
            }
          );
        $urlRouterProvider
            .otherwise('/');
});
