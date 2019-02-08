APP.CONTROLLERS.controller ('CTRL_help',['$scope','$ionicLoading','$http','$ionicPopup','$state','$ionicSideMenuDelegate',
    function($scope,$ionicLoading,$http,$ionicPopup, $state, $ionicSideMenuDelegate){
	var theCtrl = this;
	
	$scope.showMenu = function () {
		if(document.URL.indexOf('/menu/login') <0){//Disable hanburger in log in state
			 $ionicSideMenuDelegate.toggleLeft();
		}
	   
	  };
	
}])