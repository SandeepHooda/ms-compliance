APP.CONTROLLERS.controller ('CTRL_reportees',['$scope','$ionicLoading','$http','$ionicPopup','$state','$ionicSideMenuDelegate','appData', 
    function($scope,$ionicLoading,$http,$ionicPopup, $state, $ionicSideMenuDelegate,appData ){
	var theCtrl = this;
	var config = {
            headers : {
                'Content-Type': 'application/json;'
            }
        }

	$scope.myReportees = [];
	
	$scope.showMenu = function () {
		if(document.URL.indexOf('/menu/login') <0){//Disable hanburger in log in state
			 $ionicSideMenuDelegate.toggleLeft();
		}
	   
	  };
	  
	  $scope.emailAddress = window.localStorage.getItem('emailID');
	  if (!$scope.emailAddress){
			$state.transitionTo('menu.login');
		}
	  
	  $scope.mySelectedConstraints = function(data){
		  if (!data){
			  return;
		  }
		  if (data.indexOf('training') >=0){
			  theCtrl.training = true;
			}else {
				theCtrl.training = false;
			}
			if (data.indexOf('phishing') >=0){
				theCtrl.phishing = true;
			}else {
				theCtrl.phishing = false;
			}
	  }
	  $scope.getUserDetails = function(){
		  $http.get(appData.getHost()+'/ws/compliance/userDetails/'+$scope.emailAddress)
	  		.then(function(response){
	  			
	  			$scope.myReportees = response.data.reportees ;
	  			$scope.mySelectedConstraints(response.data.coplianceTargetForTeam);
	  			
	  			
	  		},
		function(response){
			
			
		});
	  }
	
	  $scope.enforceCompliance  = function(){
		 var teamconstraints = [];
		 if (theCtrl.training){
			 teamconstraints.push('training');
		 }
		 if (theCtrl.phishing){
			 teamconstraints.push('phishing');
		 }
		 
		 appData.showBusy();
		 var manager = {};
		 manager._id = $scope.emailAddress;
		 manager.coplianceTargetForTeam = teamconstraints ;
		 $http.post(appData.getHost()+'/ws/compliance/applyConstraints',manager , config)
	  		.then(function(response){
	  			appData.hideBusy();
	  		},
			function(response){
	  			appData.hideBusy();
	  			appData.popUp("Failure", " Please try again");
	  			});
	  }
	  
	  $scope.checkEnter = function(){
			if(event.keyCode == 13){
				$scope.addReportee();
			}
		}
	 $scope.addReportee = function(position) {
		 if (!theCtrl.newReportee){
			 return;
		 }else {
			 theCtrl.newReportee = theCtrl.newReportee.toLowerCase();
		 }
		  
		 if (theCtrl.newReportee.indexOf("@") <0) {
			 theCtrl.newReportee =theCtrl.newReportee+"@morganstanley.com";
			}
		   var manager = {};
		   manager._id = $scope.emailAddress ;
		   manager.reportees = [];
		   manager.reportees.push(theCtrl.newReportee);
		   appData.showBusy();
		    
		    $http.post(appData.getHost()+'/ws/compliance/reportee',manager , config)
	  		.then(function(response){
	  			theCtrl.newReportee = "";
	  			appData.hideBusy();
	  			$scope.myReportees = response.data.reportees;
	  			
	  		},
			function(response){
	  			appData.hideBusy();
	  			appData.popUp("Failure", " Please try again");
	  			});
		}
	 $scope.deleteReportee = function(index){
		 
		 var confirmPopup = $ionicPopup.confirm({
		     title: 'Confirmation',
		     template: 'Do you want to delete '+$scope.myReportees[index] +' from your team?'
		   });

		   confirmPopup.then(function(res) {
			   if (res){
				   $http.delete(appData.getHost()+'/ws/compliance/reportee/'+$scope.emailAddress+"/"+$scope.myReportees[index] )
			  		.then(function(response){
			  			
			  			appData.hideBusy();
			  			$scope.myReportees = response.data.reportees;
			  			
			  		},
					function(response){
			  			appData.hideBusy();
			  			appData.popUp("Failure", " Please try again");
			  			});
			   }
		   })
			 
			    
	}
}])