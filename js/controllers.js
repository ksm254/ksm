(function(){
  angular.module('app')
    .controller('mainPageCtrl',['$scope',function($scope){
        $scope.message = "This is amaziing!!!";
    }])
    .controller('loginCtrl',['$scope','user',function($scope,user){
      $scope.msg = "function";
      $scope.logIn = function(data){

        var $data = angular.toJson(data);
        user.logIn($scope,$data).then(function(data){
           console.log(data.data);
        });
      }
    }])
    .controller('signUpCtrl',['$scope','user','$state','$mdDialog',function($scope,user,$state,$mdDialog){
      $scope.emailAvailable = 0;
      $scope.openFromLeft = function() {
      $mdDialog.show(
        $mdDialog.alert()
          .clickOutsideToClose(true)
          .title('Thank you for signing up!')
          .textContent('You may now Log In')
          .ariaLabel('Verification Dialog!')
          .ok('OK!!')
          // You can specify either sting with query selector
          // or an element
      );
     };
        $scope.validMail = function(){
          if($scope.noUser){
		   			return true;
		   		}
		   		else{
		   			return false;
		   		}
        }
        $scope.signUp = function(data){
          var $data = angular.toJson(data);
          user.signup($scope,$data).then(function(data){
            console.log(data.data);
            $scope.openFromLeft();
          });
          $state.go('home',{});
        }

    }])
    .controller('pformCtrl',['$scope','user',function($scope,user){
      $scope.saveProctor = function(data){
        var $data = angular.toJson(data);
        user.saveProctor($scope,$data).then(function(data){

          $scope.form1.$setUntouched();
          $scope.user= " ";
          $scope.form1.$setPristine();

        });
      }
      $scope.shiftList = [
		        { time: 'I', value: 'I' },
		        { time: 'II', value: 'II' }
		      ];
      $scope.branchList = [
		        { name: 'Computer Engineering', value: 'Computer' },
		        { name: 'Mechanical Engineering', value: 'Mechanical' },
		        { name: 'Electronics and Telecommunication ', value: 'ENTC' }
		      ];
      $scope.yoaList = [
        {year:'2016-17', value: '16-17'},
        {year:'2017-18', value: '17-18'},
        {year:'2015-16', value: '15-16'},
        {year:'2014-15', value: '14-15'},
        {year:'2013-14', value: '13-14'},
        {year:'2012-13', value: '12-13'}
]

    }])
    //#################################################### DIRECTIVES
    .directive('ngUnique', function(user) {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, elm, attr, model) {
        elm.on('keyup',function(evt) {
          var val = elm.val();
          user.isUniqueUser(scope,val);
          });
        }
      }
    }) //#################################################### SERVICES
    .factory('user',['$http',function($http){
      return {
        signup: function(scope,data){
				    return  $http.post('/ksm/data/users/signup.php',data);
			   },
         isUniqueUser:function(scope,dat){
				var data = {
					email:dat
				};
				  $http.post('/ksm/data/users/isUniqueUser.php',data).then(function(data){

				  	if(data.data == 0){
				  		scope.showerr = false;
				  		scope.user1 = false;
				  		scope.noUser = true;
				  		scope.emailAvailable = 1;
				  	}
				  	else if (data.data == 1){
				  		scope.showerr = false;
				  		scope.user1 = true;
				  		scope.noUser = false;
				  		scope.emailAvailable = 2;

				  	}
				  	else{
				  		scope.showerr = true;
				  		scope.noUser = false;
				  		scope.user1 = false;
				  		scope.message = data.data;
				  		scope.emailAvailable = 2;

				  	     }
				      });
			     },
         logIn: function(scope,data){
				  return $http.post('/ksm/data/users/login.php',data);
         },
         saveProctor : function (scope,data) {
           return $http.post('/ksm/data/users/proctor-form.php',data);
         }

      }
    }]);
})();
