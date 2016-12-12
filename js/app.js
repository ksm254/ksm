var app = null;

(function(){
  app = angular.module('app',[
    'ui.router',
		'ngAnimate',
		'ngMaterial'
  ])
  .config(config)
  .run(run);

  config.$inject = ['$urlRouterProvider', '$locationProvider','$stateProvider'];
  function config ($urlProvider, $locationProvider,$stateProvider){
			$stateProvider
			.state('home',{
				url:'/',
				templateUrl:'templates/login.html',
				controller:'loginCtrl'
				// data: {authenticate : false}
			})
      // .state('login',{
      //   url:'/login-page',
      //   templateUrl:'templates/login.html',
      //   controller:'loginCtrl'
      // })
      .state('signup',{
        url:'/sign-up',
        templateUrl:'templates/signup.html',
        controller:'signUpCtrl'
      })
      .state('pform',{
        url:'/proctor-form',
        templateUrl:'templates/proctor-form.html',
        controller:'pformCtrl'
      });

    		$urlProvider.otherwise('/');
    		$locationProvider.html5Mode({
    		  enabled:false,
    		  requireBase: false
    		});

		};
    function run() {
		};



})();
