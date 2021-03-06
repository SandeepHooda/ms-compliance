APP.CONTROLLERS.controller ('CTRL_Login',['$scope','$state','$http','$ionicLoading','appData',
    function($scope,$state,$http,$ionicLoading,appData){
	var theCtrl = this;
	$scope.host = appData.getHost();
	
	 var config = {
	            headers : {
	                'Content-Type': 'application/json;'
	            }
	        }
	
	 $scope.checkEnter = function(){
			if(event.keyCode == 13){
				$scope.createUser();
			}
		}
	 $scope.createUser = function() {
		  if (!theCtrl.emailAddress){
			  return;
		  }else {
			  theCtrl.emailAddress = theCtrl.emailAddress.toLowerCase();
		  }
		  if (theCtrl.emailAddress.indexOf("@") <0) {
				 theCtrl.emailAddress =theCtrl.emailAddress+"@morganstanley.com";
				}
		   var teamMember = {};
		   teamMember._id = theCtrl.emailAddress;
		   
		   appData.showBusy();
		    
		    $http.post(appData.getHost()+'/ws/compliance/user',teamMember , config)
	  		.then(function(response){
	  			window.localStorage.setItem('emailID', theCtrl.emailAddress);
	  			appData.hideBusy();
	  			
	  			$state.transitionTo('menu.tab.home');
	  		},
			function(response){
	  			appData.hideBusy();
	  			appData.popUp("Failure", "Loging failure. Please try again");
	  			});
		}
	  
}
])