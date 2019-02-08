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
	  
	  $scope.getReportees = function(){
		  $http.get(appData.getHost()+'/ws/compliance/reportees/'+$scope.emailAddress)
	  		.then(function(response){
	  			$scope.myReportees = response.data.reporteesEmailID ;
	  			
	  			
	  		},
		function(response){
			
			
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
		 }
		  
		   var manager = {};
		   manager._id = $scope.emailAddress ;
		   manager.reportees = [];
		   manager.reportees.push(theCtrl.newReportee);
		   appData.showBusy();
		    
		    $http.post(appData.getHost()+'/ws/compliance/reportee',manager , config)
	  		.then(function(response){
	  			
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